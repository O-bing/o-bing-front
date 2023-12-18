import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  @Input() user!: User;
  
  @Input() currentUser!: User;

  @Output() addFriendEvent = new EventEmitter<string>();;

  @Output() removeFriendEvent = new EventEmitter<string>();;

  public imgProfileURL: string = '';

  loading: boolean = true

  loadingImg: boolean = true

  display: boolean = false

  alreadyFriend: boolean = true

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.currentUser.friendsList && !this.currentUser.friendsList.includes(this.user.uid!)){
      this.alreadyFriend = false
    }
    if (this.user.imgProfileRef == 'imgProfileRef.png') {
      this.userService.getStaticUserPhoto().subscribe(res => {
        this.imgProfileURL = res
        this.loadingImg = false
      })
    }
    else {
      this.userService.getUserPhoto(this.user.imgProfileRef!).subscribe(res => {
        this.imgProfileURL = res
        this.loadingImg = false
      })
    }
  }

  addFriend(friendId:string):void{
    this.addFriendEvent.emit(friendId)
  }

  removeFriend(friendId:string):void{
    this.removeFriendEvent.emit(friendId)
  }

}
