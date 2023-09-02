import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/class/user';
import { toast } from 'bulma-toast'
import { AuthService } from 'src/app/@shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @Output() onSubmit: EventEmitter<User>;

  postForm: UntypedFormGroup

  submitted = false;

  baseImage!: File;

  constructor(private authService: AuthService) {
    this.postForm = new UntypedFormGroup({
      pseudo: new UntypedFormControl("", Validators.required),
      email: new UntypedFormControl("",
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      ),
      password: new UntypedFormControl("", Validators.required),
      checkPassword: new UntypedFormControl("", Validators.required)
    });
    this.onSubmit = new EventEmitter();
  }

  ngOnInit(): void {
  }

  errorHandler(error: any): void {
    console.log(error)
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