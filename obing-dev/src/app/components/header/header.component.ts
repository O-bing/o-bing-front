import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { UserService } from 'src/app/@shared/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser:User={pseudo:""}

  currentUserConnected:boolean=false

  imgProfileURL:string="";

  constructor(public authService : AuthService, public userService:UserService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user=>{
      if(user){
        this.currentUserConnected = true
        this.userService.getUser(user.uid).subscribe(userObject=>{
          this.currentUser.pseudo=userObject?.pseudo
        })
      }
    })
  }

}
