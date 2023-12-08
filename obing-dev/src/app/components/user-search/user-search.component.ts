import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  online:boolean=false;

  userList!:User[]

  loading:boolean=true

  constructor(
    private onlineStateSvc: OnlineStateService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      this.online = state
      if(this.online){
        this.userService.getUsers().subscribe(list=>{
          if (list.length>0){
            this.userList = list
          }
          this.loading = false
        })
      } else{
        this.loading = false
      }
    })
  }

}
