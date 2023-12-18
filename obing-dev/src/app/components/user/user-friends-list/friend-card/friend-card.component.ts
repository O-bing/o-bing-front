import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent {

  @Input() user!: User;
  
  @Input() currentUser!: User;

  @Output() removeFriendEvent = new EventEmitter<string>();;

  public imgProfileURL: string = '';

  loading: boolean = true

  loadingImg: boolean = true

  display: boolean = false

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
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
  
  removeFriend(friendId:string):void{
    this.removeFriendEvent.emit(friendId)
  }

}
