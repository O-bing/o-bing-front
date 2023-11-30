import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/@shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string = 'O-bing';

  loading: boolean = true;

  currentUser: User = {};

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
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
  }
}
