import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() CurrentUser:User = {
    isLoggedIn:false
  };

  imgProfileURL : string = '';

  displayProfile : Boolean = false;

  displayConnect : Boolean = false;

  constructor() { }

  displayProfileHeader(){
    if (!this.displayProfile){
      this.displayProfile = true
    }
    else{
      this.displayProfile = false
    }
  }

  displayConnectHeader(){
    if (!this.displayConnect){
      this.displayConnect = true
    }
    else{
      this.displayConnect = false
    }
  }

  clickEvent(){
    this.displayProfile = false
    this.displayConnect = false
  }


}
