import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService : AuthService, public onlineStateSvc: OnlineStateService) {
    const state = this.onlineStateSvc.checkNetworkStatus()
    if (state)
    {
      console.log("You're currently online")
    } else {
      console.log("You're currently offline")
    }
  }

  ngOnInit(): void {
  }

  ForgotPassword(passwordResetEmail:string){
    this.authService.ForgotPassword(passwordResetEmail);
  }

}
