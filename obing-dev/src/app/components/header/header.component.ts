import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/@shared/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() CurrentUser!:User;

  currentUser! : User;

  isLoggedIn! : Boolean;

  imgProfileURL : string="";

  constructor(private authService : AuthService, private userService:UserService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user=>{
      if(user){
        this.userService.getUser(user.uid).subscribe(userObject=>{
          this.currentUser = {}
          this.currentUser.pseudo=userObject?.pseudo
          this.currentUser.uid=user.uid
          this.isLoggedIn = true
        })
      }
    })
  }

  logOut(){
    this.authService.SignOut()
  }

}
