import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  online: boolean = false;

  userList!: User[]

  loading: boolean = true

  constructor(
    private onlineStateSvc: OnlineStateService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      this.online = state
      if (this.online) {
        this.refreshList()
      } else {
        this.loading = false
      }
    })
  }

  refreshList() {
    this.loading = true
    this.userService.getUsers().subscribe(list => {
      if (list.length > 0) {
        this.userList = list
      }
      this.loading = false
    })
  }

  accordionAction(userId: string) {
    let accordion: HTMLElement = document.querySelector(`button.${userId}`) as HTMLElement
    let panel: HTMLElement = document.querySelector(`div.${userId}`) as HTMLElement
    if (panel.style.display === "block") {
      panel.style.display = "none";
      accordion.style.borderBottomRightRadius = '4px'
      accordion.style.borderBottomLeftRadius = '4px'
      accordion.style.backgroundColor = 'rgb(77, 189, 223)'
    } else {
      panel.style.display = "block";
      accordion.style.borderBottomRightRadius = '0px'
      accordion.style.borderBottomLeftRadius = '0px'
      accordion.style.backgroundColor = 'rgb(63, 160, 189)'
    }
  }


}
