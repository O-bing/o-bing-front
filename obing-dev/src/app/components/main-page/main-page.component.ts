import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { UserService } from 'src/app/@shared/services/user/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  currentUserConnected:boolean=false

  constructor(private authService : AuthService, private userService:UserService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user=>{
      if(user){
        this.currentUserConnected = true
      }
    })
  }

  logOut(){
    this.authService.SignOut()
  }

}
