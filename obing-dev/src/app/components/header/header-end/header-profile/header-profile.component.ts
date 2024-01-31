import { Component, Input, Output, EventEmitter, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {

  @Input() userProfile: User = {uid:''};

  @Input() DisplayProfile: boolean = false;

  @Output() CloseClick = new EventEmitter();

  closeClicked: boolean = false;

  settingsTarget!: HTMLElement

  public loading: boolean = true;

  shown: boolean = false;

  online: boolean = false

  currentUser!: firebase.default.User

  constructor(
    private authService: AuthService,
    public userService: UserService,
    private router: Router,
    private el: ElementRef,
    private onlineStateSvc: OnlineStateService,
  ) { }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      this.online = state
      if (this.online) {
        this.authService.getCurrentUser().subscribe(user => {
          if(user){
            this.currentUser=user
            this.userProfile.emailVerified = this.currentUser.emailVerified
            this.loading = false
            this.shown = true
          }
        })
      } else {
        this.loading = false
      }
    })
  }

  @HostListener('document:click', ['$event.target'])
  clickInOut(target: any) {
    const clickedIn = this.el.nativeElement.contains(target)
    if (!clickedIn) {
      if (this.shown) {
        this.shown = false
        this.CloseClick.emit()
      }
    } else {
      this.shown = true
    }
  }


  mouseAction(action: string) {
    this.settingsTarget = document.querySelector('img.settingsImg') as HTMLElement
    if (action == "enter") {
      this.settingsTarget.style.backgroundColor = 'rgb(240, 230, 230)';
    }
    else if (action == "leave") {
      this.settingsTarget.style.backgroundColor = 'rgb(255, 255, 255)';
    }
  }

  closeClick() {
    this.closeClicked = true
    this.CloseClick.emit()
  }

  logOut() {
    this.authService.SignOut()
    this.router.navigate([''])
  }

}
