import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  online: boolean = false;

  constructor(
    public authService: AuthService,
    private onlineStateSvc: OnlineStateService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      this.online = state
    })
  }

  login(username: string, password: string) {
    if (this.online) {
      this.authService.signIn(username, password).then((result) => {
        if (result) {
          this.ngZone.run(() => {
            this.router.navigate(['/']);
          });
        }
      })
    }
  }

  ForgotPassword(passwordResetEmail: string) {
    if(this.online){
      this.authService.ForgotPassword(passwordResetEmail);
    }
  }

}
