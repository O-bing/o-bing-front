import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';

@Component({
  selector: 'app-header-connect',
  templateUrl: './header-connect.component.html',
  styleUrls: ['./header-connect.component.scss']
})
export class HeaderConnectComponent implements OnInit {

  constructor(public authService: AuthService, private onlineStateSvc: OnlineStateService, private router: Router, private ngZone: NgZone) {
    const state = this.onlineStateSvc.checkNetworkStatus()
    if (state) {
      console.log("You're currently online")
    } else {
      console.log("You're currently offline")
    }
  }

  ngOnInit(): void {
  }

  login(username: string, password: string) {
    this.authService.signIn(username, password).then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['/']);
      });
    }
    )
  }

  ForgotPassword(passwordResetEmail: string) {
    this.authService.ForgotPassword(passwordResetEmail);
  }

}
