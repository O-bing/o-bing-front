import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  @Input() user!: User;

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

}
