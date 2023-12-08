import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/class/user';
import { toast } from 'bulma-toast'
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { guid } from 'src/app/utils/guid';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @Output() onSubmit: EventEmitter<User>;

  postForm: FormGroup

  submitted = false;

  online:boolean=true;

  constructor(
    private authService: AuthService,
    private userService:UserService,
    private onlineStateSvc: OnlineStateService
    ) {
    this.postForm = new FormGroup({
      pseudo: new FormControl("", Validators.required),
      email: new FormControl("",
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      ),
      password: new FormControl("", Validators.required),
      checkPassword: new FormControl("", Validators.required)
    });
    this.onSubmit = new EventEmitter();
  }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      this.online = state
    })
  }
  
  signUp() {
    this.submitted = true;
    if (this.postForm.get('email')!.status == 'INVALID') {
      toast({
        message: 'Email must be a valid email address',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
        position: 'top-right'
      })
      return;
    }
    let pwd = this.postForm.get('password')!.value;
    let pwd1 = this.postForm.get('checkPassword')!.value;
    if (pwd === pwd1) {
      const newUser: User = {
        pseudo: this.postForm.get('pseudo')!.value,
        mail: this.postForm.get('email')!.value,
        imgProfileRef: 'imgProfileRef.png'
      }
      this.authService.SignUp(newUser, this.postForm.get('password')!.value)
    }
    else {
      toast({
        message: 'Passwords doesn\'t match.',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
        position: 'top-right'
      })
      return;
    }
  }

}