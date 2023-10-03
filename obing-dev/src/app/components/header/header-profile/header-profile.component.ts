import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {

  @Input() userProfile! : User;

  @Output() clickEvent = new EventEmitter<Boolean>();

  settingsClicked : Boolean = false;

  settingsTarget! : HTMLElement

  constructor(private authService : AuthService) {}

  ngOnInit(): void {
      this.settingsTarget = document.querySelector('img.settingsImg') as HTMLElement
  }

  mouseAction(action:string){
    if(action=="enter"){
      this.settingsTarget.style.backgroundColor='rgb(222, 214, 214)';
    }
    else if(action=="leave"){
      this.settingsTarget.style.backgroundColor='rgb(240, 230, 230)';
    }
  }

  settingsClick(){
    this.settingsClicked = true
    this.clickEvent.emit(this.settingsClicked)
  }

  
  logOut(){
    this.authService.SignOut()
  }

}
