import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  currentUserConnected: boolean = false

  online: boolean = false

  searchUserButton! : HTMLElement
  signUpButton! : HTMLElement
  logInButton! : HTMLElement

  constructor(
    private authService: AuthService,
    private onlineStateSvc: OnlineStateService
  ) { }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().then(state => {
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
    this.searchUserButton = document.querySelector('button.searchUser') as HTMLElement
    this.signUpButton = document.querySelector('button.signUp') as HTMLElement
    this.logInButton = document.querySelector('button.logIn') as HTMLElement
    this.checkOfflineState()
  }

  checkOfflineState() {

    if (!this.online) {
      this.onOffButton(this.searchUserButton, 'rgb(93, 96, 96)', 'rgb(48, 47, 47)')
      this.onOffButton(this.signUpButton, 'rgb(93, 96, 96)', 'rgb(48, 47, 47)')
      this.onOffButton(this.logInButton, 'rgb(93, 96, 96)', 'rgb(48, 47, 47)')

    } else {
      this.offOnButton(this.searchUserButton, '#f5f5f5', 'rgba(0,0,0,.7)')
      this.offOnButton(this.signUpButton, 'rgb(77, 189, 223)', 'rgb(255, 255, 255)')
      this.offOnButton(this.logInButton, '#00d1b2','rgb(255, 255, 255)')
    }
  }

  private onOffButton(button: HTMLElement, backgroundColor:string, color:string) {
    button.style.backgroundColor = backgroundColor;
    button.style.color = color;
    button.title = '';
    button.title = 'This feature is disabled while offline';
    button.setAttribute('disabled', 'true');
  }

  private offOnButton(button: HTMLElement, backgroundColor:string, color:string) {
    button.style.backgroundColor = backgroundColor;
    button.style.color = color;
    button.removeAttribute('disabled');
  }

}
