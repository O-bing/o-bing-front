import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';
import { UserService } from 'src/app/@shared/services/user/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  currentUserConnected: boolean = false

  online: boolean = true

  constructor(
    private authService: AuthService,
    private onlineStateSvc: OnlineStateService
  ) { }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().subscribe(state => {
      this.online = state
      if (this.online) {
        this.authService.getCurrentUser().subscribe(user => {
          if (user) {
            this.currentUserConnected = true
          }
        })
      }
    })
  }

  ngAfterViewChecked() {
    if (!this.online) {
      let searchUserButton = document.querySelector('button.searchUser') as HTMLElement
      let signUpButton = document.querySelector('button.signUp') as HTMLElement
      let logInButton = document.querySelector('button.logIn') as HTMLElement
      this.onfOffButtons(searchUserButton)
      this.onfOffButtons(signUpButton)
      this.onfOffButtons(logInButton)
    }
  }

  private onfOffButtons(button: HTMLElement) {
    button.style.backgroundColor = 'rgb(93, 96, 96)';
    button.style.color = 'rgb(48, 47, 47)';
    button.title = 'This feature is disabled while offline';
    button.setAttribute('disabled', 'true');
  }



}
