import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  private loading: boolean = true;
  public imgProfileURL: string = '';


  constructor(
    private userService: UserService,
    private authService: AuthService,
    public router: Router,
  ) {
    this.postForm = new FormGroup({
      Titre: new FormControl(),
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
        this.userService.getUser(user.uid).subscribe(userObject => {
          if (userObject) {
            this.user = userObject
            this.loading = false
            this.postForm.get("Titre")!.setValue(this.getRank(this.user.rank!));

            const userImgRefSubscription: Subscription = this.userService.getUserPhoto(this.user.imgProfileRef!).subscribe(res => {
              this.imgProfileURL = res
            })

            if (this.user.description != null) {
              this.postForm.get("Description")!.setValue(this.user.description);
            }
          }

        })
      }
      else {
        this.loading = false
      }
    })
  }

  submitForm() {
    let pseudo1: string = this.postForm.get("Pseudo")!.value;
    let pseudo2: string = this.postForm.get("ConfirmerPseudo")!.value;
    let pwd1 = this.postForm.get("password")!.value;
    let pwd2 = this.postForm.get("password2")!.value;
    this.authService.getCurrentUser().subscribe(user => {
      if (user != null) {
        this.userService.getUser(user.uid).subscribe(userObject => {
          if (userObject) {
            userObject.uid = user.uid // adding uid for cleaner data usage in code
            if (this.imgToUpload) {
              /*if (userObject.imgProfileRef != "48f6eaz4f8ez4az6f4ea8f4a5faz4f8af6azf4a2f1afza8f4za7azfa.png") {
                this.userService.deleteUserPhoto(userObject.imgProfileRef!);
              }*/
              const ID = guid.uuidv4();
              this.userService.uploadUserPhoto(this.imgToUpload, ID);
              console.log("test", userObject.uid!, ID)
              this.userService.updateImgProfileRef(userObject.uid!, ID);
            }
            this.userService.updateUserDescription(userObject.uid!, this.postForm.get("Description")!.value)

            if (pseudo1 != null && pseudo1.length > 0 && pseudo2 != null && pseudo2.length > 0) {
              this.changePseudo(pseudo1, pseudo2, userObject.uid!);
            }

            if (pwd1 != null && pwd1.length > 0 && pwd2 != null && pwd2.length > 0 && this.check(pwd1, pwd2, "mot de passe")) {
              this.userService.updatePassword(pwd1)
            }
          }
        });
      }
    });

    this.postForm.get("Pseudo")!.setValue("");
    this.postForm.get("ConfirmerPseudo")!.setValue("");
    this.postForm.get("password")!.setValue("");
    this.postForm.get("password2")!.setValue("");
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
    if (this.user.imgProfileRef != '48f6eaz4f8ez4az6f4ea8f4a5faz4f8af6azf4a2f1afza8f4za7azfa.png') {
      this.userService.deleteUserPhoto(this.user.imgProfileRef!);
    }
    this.userService.deletUser(this.user.uid!)
    this.router.navigate(['/'])
  }

  uploadPhoto(event: Event) {
    const target = event.target as HTMLInputElement;
    this.imgToUpload = target.files![0];
  }

  getRank(rang: UserRank): string {
    if (rang == UserRank.UserLambda) {
      return "Utilisateur";
    }
    else {
      return "Administrateur";
    }
  }
}