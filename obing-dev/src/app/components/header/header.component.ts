import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() public CurrentUser: User = {
    isLoggedIn: false
  };

  imgProfileURL: string = '';

  displayProfile: boolean = false;

  displayConnect: boolean = false;

  loading: boolean = true

  public authUser: firebase.default.User | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
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
  }

  displayHeaders(){
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
