import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { UserService } from 'src/app/@shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'O-bing';

  currentUser:User={pseudo:""}
  constructor(private authService : AuthService, private userService:UserService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user=>{
      if(user){
        this.userService.getUser(user.uid).subscribe(userObject=>{
          this.currentUser.pseudo=userObject?.pseudo
          this.currentUser.uid=user.uid
        })
      }
    })
  }
}
