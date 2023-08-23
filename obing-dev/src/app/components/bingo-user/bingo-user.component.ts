import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { BingoService } from 'src/app/@shared/services/bingo/bingo.service';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { Bingo } from 'src/app/class/bingo';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-bingo-user',
  templateUrl: './bingo-user.component.html',
  styleUrls: ['./bingo-user.component.scss']
})
export class BingoUserComponent implements OnInit {

  currentUser! : User;

  isLoggedIn! : Boolean;

  bingoUserList:Bingo[] = []

  constructor(private bingoService:BingoService, private authService:AuthService, private userService:UserService) { }

  ngOnInit(): void {

    this.authService.getCurrentUser().subscribe(user=>{
      if(user){
        this.userService.getUser(user.uid).subscribe(userObject=>{
          this.currentUser = {}
          this.currentUser.pseudo=userObject?.pseudo
          this.currentUser.uid=user.uid
          this.isLoggedIn = true

          this.bingoService.getAllBingos().subscribe(bingoArray=>{
            bingoArray.forEach(bingo=>{
              if (bingo.owner==this.currentUser.uid){
                this.bingoUserList.push(bingo)
              }
            })
          })
        })
      }
    })
  }

}
