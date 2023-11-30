import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { User, UserRank } from 'src/app/class/user';
import { guid } from 'src/app/utils/guid';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  public user: User = {};
  public postForm: FormGroup;
  private imgToUpload: File | null = null;
  public loading: boolean = true;
  public loadingImg: boolean = true;
  public imgProfileURL: string = '';
  public authUser: firebase.default.User | undefined;


  constructor(
    public userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.postForm = new FormGroup({
      Description: new FormControl(),
      Pseudo: new FormControl(),
      ConfirmerPseudo: new FormControl(),
      password: new FormControl(),
      password2: new FormControl()
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.authUser = user
        this.userService.getUser(user.uid).subscribe(userObject => {
          if (userObject) {
            this.user = userObject
            this.user.uid = user.uid
            if (this.user.imgProfileRef == 'imgProfileRef.png') {
              this.userService.getStaticUserPhoto().subscribe(res => {
                this.imgProfileURL = res
                this.loadingImg = false
              })
            }
            else {
              this.userService.getUserPhoto(this.user.imgProfileRef!).subscribe(res => {
                this.imgProfileURL = res
                this.loadingImg = false
              })
            }

            if (this.user.description != null) {
              this.postForm.get("Description")!.setValue(this.user.description);
            }

            this.loading = false
          }

        })
      }
      else {
        this.loading = false
        this.router.navigate(['**'])
      }
    })
  }

  submitForm() {
    let action: boolean = false
    this.loading = true
    if(this.imgToUpload){
      action = true
      const ID = guid.uuidv4();
      if (this.user.imgProfileRef != 'imgProfileRef.png') {
        this.userService.deleteUserPhoto(this.user.imgProfileRef!);
      }
      this.userService.uploadUserPhoto(this.imgToUpload, ID)
      this.userService.updateImgProfileRef(this.user.uid!, ID);
      this.user.imgProfileRef = ID
    }
    let pseudo1: string = this.postForm.get("Pseudo")!.value;
    let pseudo2: string = this.postForm.get("ConfirmerPseudo")!.value;

    this.userService.updateUserDescription(this.user.uid!, this.postForm.get("Description")!.value)

    if (pseudo1 != null && pseudo1.length > 0 && pseudo2 != null && pseudo2.length > 0) {
      action = true
      this.changePseudo(pseudo1, pseudo2, this.user.uid!);
    }

    let pwd1 = this.postForm.get("password")!.value;
    let pwd2 = this.postForm.get("password2")!.value;

    if (pwd1 != null && pwd1.length > 0 && pwd2 != null && pwd2.length > 0 && this.check(pwd1, pwd2, "mot de passe")) {
      action = true
      this.userService.updatePassword(pwd1)
    }

    this.postForm.get("Pseudo")!.setValue("");
    this.postForm.get("ConfirmerPseudo")!.setValue("");
    this.postForm.get("password")!.setValue("");
    this.postForm.get("password2")!.setValue("");
    this.loading = false

    if (action){
      this.router.navigate(['/'])
    }
  }

  changePseudo(pseudo1: string, pseudo2: string, idProfile: string): void {

    if (this.check(pseudo1, pseudo2, "pseudo")) {
      this.userService.updatePseudo(idProfile, pseudo1)
    }
  }

  check(string1: string, string2: string, string3: string): boolean {
    if (string1 == string2) {
      return true;
    } else {
      alert(string3 + " different");
      return false
    }

  }

  deleteAccount() {
    if (this.user.imgProfileRef != 'imgProfileRef.png') {
      this.userService.deleteUserPhoto(this.user.imgProfileRef!);
    }
    this.userService.deletUser(this.user.uid!)
    this.router.navigate(['/'])
  }

  uploadPhoto(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length != 0) {
      this.imgToUpload = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imgProfileURL = reader.result as string;
      }
      reader.readAsDataURL(this.imgToUpload)
    }
  }

  resetUserPhoto(){
    if(this.authUser && this.user.imgProfileRef != 'imgProfileRef.png'){
      this.userService.getStaticUserPhoto().subscribe(res => {
        this.imgProfileURL = res
      })
      
      this.userService.updateImgProfileRef(this.authUser.uid,'imgProfileRef.png')
      this.userService.deleteUserPhoto(this.user.imgProfileRef!)
      this.user.imgProfileRef = 'imgProfileRef.png'
      this.imgToUpload = null
    }
  }

  sendVerificationEmail() {
    if (!this.authUser!.emailVerified) {
      this.authUser!.sendEmailVerification()
    }
  }
}