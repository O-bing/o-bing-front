import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { User } from 'src/app/class/user';


@Component({
  selector: 'app-user-friends-list',
  templateUrl: './user-friends-list.component.html',
  styleUrls: ['./user-friends-list.component.scss']
})
export class UserFriendsListComponent implements OnDestroy{

  @Input() currentUser: User = { uid: '', friendsList: [] }

  online: boolean = false;

  loading: boolean = true

  userList: User[] = []

  userListId:string[] = []

  private userSubscribtionList : Subscription[] = []

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

  refreshList(): void {
    this.loading = true
    this.userList = []
    this.userListId = []
    if (this.currentUser.friendsList && this.currentUser.friendsList.length > 0) {
      this.currentUser.friendsList.forEach(userId => {
        const userSubscribtion = this.userService.getUser(userId).subscribe(user => {
          if (user && !this.userListId.includes(user.uid)) {
            this.userListId.push(user.uid)
            this.userList.push(user)
          }
        })
        this.userSubscribtionList.push(userSubscribtion)
      })
    }
    this.loading = false
  }

  accordionAction(userId: string): void {
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

  removeFriend(friendId: string): void {
    if (this.currentUser.friendsList && this.currentUser.friendsList.includes(friendId)) {
      this.currentUser.friendsList.splice(this.currentUser.friendsList.indexOf(friendId), 1)
      this.userService.updateFriendList(this.currentUser.uid, this.currentUser.friendsList)
      this.refreshList()
    }
  }

  ngOnDestroy() : void {
    this.userSubscribtionList.forEach(userSubscribtion=>{
      userSubscribtion.unsubscribe()
    })
  }

}
