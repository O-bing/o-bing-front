import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {

  @Input() userProfile! : User;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    console.log(this.userProfile)
  }

  
  logOut(){
    this.authService.SignOut()
  }

}
