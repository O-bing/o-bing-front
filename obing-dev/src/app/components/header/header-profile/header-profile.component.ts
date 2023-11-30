import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {

  @Input() userProfile : User = {};

  @Output() clickEvent = new EventEmitter<Boolean>();

  settingsClicked : Boolean = false;

  settingsTarget! : HTMLElement

  public loading: boolean = true;

  constructor(private authService : AuthService, private router: Router) {}

  ngOnInit(): void {
      this.authService.getCurrentUser().subscribe(result=>{
        this.userProfile.emailVerified = result?.emailVerified
        this.loading = false
      })
  }

  mouseAction(action:string){
    this.settingsTarget = document.querySelector('img.settingsImg') as HTMLElement
    if(action=="enter"){
      this.settingsTarget.style.backgroundColor='rgb(240, 230, 230)';
    }
    else if(action=="leave"){
      this.settingsTarget.style.backgroundColor='rgb(255, 255, 255)';
    }
  }

  settingsClick(){
    this.settingsClicked = true
    this.clickEvent.emit(this.settingsClicked)
  }
  
  logOut(){
    this.authService.SignOut()
    this.router.navigate([''])
  }

}
