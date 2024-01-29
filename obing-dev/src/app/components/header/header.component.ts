import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { User } from 'src/app/class/user';
import { Version } from 'src/app/class/version';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() public CurrentUser: User = {
    uid: '',
    isLoggedIn: false
  };

  @Input() AppVersion: Version = {versionId:'NAN', date:123456789}

  @Input() IsPWA: boolean = false

  imgProfileURL: string = '';

  displayProfile: boolean = false;

  displayConnect: boolean = false;

  loading: boolean = true

  online: boolean = false

  public authUser: firebase.default.User | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private onlineStateSvc: OnlineStateService
  ) { }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      this.online = state
      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          this.authUser = user
          this.userService.getUser(user.uid).subscribe(userObject => {
            if (userObject) {
              this.CurrentUser = userObject
              this.CurrentUser.isLoggedIn = true
              if (this.CurrentUser.imgProfileRef == 'imgProfileRef.png') {
                this.userService.getStaticUserPhoto().subscribe(res => {
                  this.imgProfileURL = res
                  this.loading = false
                })
              }
              else {
                this.userService.getUserPhoto(this.CurrentUser.imgProfileRef!).subscribe(res => {
                  this.imgProfileURL = res
                  this.loading = false
                })
              }
            } else {
              this.loading = false
            }
          }
          )
        } else {
          this.loading = false
        }
      }
      )
    })
  }


  displayHeaders() {
    this.displayProfileHeader()
    this.displayConnectHeader()
  }

  displayProfileHeader() {
    if (!this.displayProfile) {
      this.displayProfile = true
    }
    else {
      this.displayProfile = false
    }
  }

  displayConnectHeader() {
    if (!this.displayConnect) {
      this.displayConnect = true
    }
    else {
      this.displayConnect = false
    }
  }

}
