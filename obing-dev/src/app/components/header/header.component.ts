import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() CurrentUser: User = {
    isLoggedIn: false
  };

  imgProfileURL: string = '';

  displayProfile: Boolean = false;

  displayConnect: Boolean = false;

  loading: Boolean = true

  constructor(
    private userService : UserService
  ){}

  ngOnInit(): void {
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

  clickEvent() {
    this.displayProfile = false
    this.displayConnect = false
  }


}
