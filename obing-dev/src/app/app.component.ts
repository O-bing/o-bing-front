import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { OnlineStateService } from './@shared/services/online-state/online-state.service';
import { AppService } from './@shared/services/app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title: string = 'O-bing';

  loading: boolean = true;

  currentUser: User = {uid:''};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private onlineStateSvc: OnlineStateService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    const isPWA = this.isPWA()
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
        if (isPWA) {
          this.checkAppVersion()
        }
      } else { // Offline mod
        this.loading = false
        window.alert("You are currently offline. Try to use the application while being connected to internet, a newer version may exist")
      }
    })

  }

  private isPWA(): boolean {
    let isPWA: boolean = false;
    window.addEventListener('DOMContentLoaded', () => {
      let displayMode = 'browser tab';
      if (window.matchMedia('(display-mode: standalone)').matches) {
        displayMode = 'standalone';
        isPWA = true
      }
    });
    return isPWA
  }

  private async checkAppVersion() {

    // Get current deployed Firebase Hosting version

    const version = this.appService.getCurrentVersion()
    if (!localStorage.getItem("version")) {
      console.log("set")
      localStorage.setItem("version", version.versionId)
      localStorage.setItem("versionDate", version.date.toString())
    } else {
      console.log("set")
      let localVersion = localStorage.getItem("version")
      let localVersionDate = Number(localStorage.getItem("versionDate"))
      if (localVersion != version.versionId && localVersionDate < version.date) {
        window.alert("Update your local app version, a newer one exists !")
      }
    }

    // Get localstorage value



    // If not in localstorage, store it



    // If in localstorage, compare it



    // If equal, do nothing (up to date !)



    // If not equal, ask user to redownload the app



    // OPTIONAL : maybe display a visual element to tell the user he's using a legacy app




  }
}
