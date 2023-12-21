import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { OnlineStateService } from './@shared/services/online-state/online-state.service';
import { AppService } from './@shared/services/app/app.service';
import { Version } from './class/version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title: string = 'O-bing';

  loading: boolean = true;

  currentUser: User = { uid: '' };

  isPWA: boolean = false

  appVersion : Version = {versionId:'NAN', date:123456789}

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private onlineStateSvc: OnlineStateService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    window.addEventListener('DOMContentLoaded', () => {
      let displayMode = 'browser tab';
      if (window.matchMedia('(display-mode: standalone)').matches) {
        displayMode = 'standalone';
        this.appVersion = this.appService.getCurrentVersion()
        this.isPWA = true
        this.checkAppVersion()
      }
    });
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      if (state) { // Online mod
        this.authService.getCurrentUser().subscribe(user => {
          if (user) {
            this.userService.getUser(user.uid).subscribe(userObject => {
              this.currentUser = userObject!
              this.currentUser.uid = user.uid
              this.currentUser.isLoggedIn = true
              this.loading = false
            })

          } else {
            this.loading = false
            this.currentUser.isLoggedIn = false
          }
        })
      } else { // Offline mod
        this.loading = false
        window.alert("You are currently offline. Try to use the application while being connected to internet, a newer version may exist")
      }
    })

  }

  private async checkAppVersion() {

    // Get current deployed Firebase Hosting version

    const version = this.appService.getCurrentVersion()
    if (!localStorage.getItem("version")) {
      localStorage.setItem("version", version.versionId)
      localStorage.setItem("versionDate", version.date.toString())
      localStorage.setItem("versionNotified", "0")
    } else {
      let localVersion = localStorage.getItem("version")
      let alreadyNotified = localStorage.getItem("versionNotified")
      if (alreadyNotified != "1" && localVersion != version.versionId) {
        window.alert("Update your local app version, a newer one exists !")
        localStorage.setItem("versionNotified", "1")
      }
    }
  }
}
