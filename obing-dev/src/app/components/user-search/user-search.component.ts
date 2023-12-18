import { Component, OnInit } from '@angular/core';
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

  userList: User[] = [];

  loading: boolean = true

  currentUser: User = {uid:'', friendsList:[]}

  constructor(
    private onlineStateSvc: OnlineStateService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      this.online = state
      if (this.online) {
        this.authService.getCurrentUser().subscribe(currentUser => {
          if (currentUser) {
            this.userService.getUser(currentUser.uid).subscribe(user => {
              if (user) {
                this.currentUser = user
                if (!this.currentUser.friendsList) {
                  this.currentUser.friendsList = []
                }
              }
            })
          }
        })
        this.refreshList()
      } else {
        this.loading = false
      }
    })
  }

  refreshList():void{
    this.loading = true
    this.userService.getUsers().subscribe(list => {
      this.userList = []
      if (list.length > 0) {
        list.forEach(user => {
          this.userList.push(user)
        })
        this.loading = false
      }
    })
  }

  accordionAction(userId: string):void{
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

  addFriend(friendId:string):void{
    if (this.currentUser! && this.currentUser.uid != friendId) {

      if (!this.currentUser.friendsList) {
        this.currentUser.friendsList = []
      }
      
      if(!this.currentUser.friendsList.includes(friendId)){
        this.currentUser.friendsList.push(friendId)
        this.userService.updateFriendList(this.currentUser.uid, this.currentUser.friendsList)
      } else{
        window.alert("You already added this user.")
      }

    } else{
      window.alert("You can't add yourselves as a friend.")
    }
  }

  removeFriend(friendId:string):void{
    if(this.currentUser.friendsList && this.currentUser.friendsList.includes(friendId)){
      this.currentUser.friendsList.splice(this.currentUser.friendsList.indexOf(friendId),1)
      this.userService.updateFriendList(this.currentUser.uid, this.currentUser.friendsList)
    }
  }


}
