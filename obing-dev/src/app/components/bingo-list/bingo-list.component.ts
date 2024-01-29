import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { BingoFileService } from 'src/app/@shared/services/bingo-file/bingo-file.service';
import { BingoPrivateRefService } from 'src/app/@shared/services/bingo/bingo-private-ref/bingo-private-ref.service';
import { BingoService } from 'src/app/@shared/services/bingo/bingo.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { LocalBingoObject } from 'src/app/class/localBingoObect';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-bingo-user',
  templateUrl: './bingo-list.component.html',
  styleUrls: ['./bingo-list.component.scss'],
  standalone: true,
  imports:[
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    RouterLink
  ]
})
export class BingoListComponent implements OnInit {

  currentUser: User = { uid: '' };

  isLoggedIn: boolean = false;

  loading: boolean = true;

  bingoList: LocalBingoObject[] = []

  localBingoList: LocalBingoObject[] = []

  online: boolean = false

  connected: boolean = false

  constructor(
    private bingoService: BingoService,
    private bingoPrivateRefService: BingoPrivateRefService,
    private authService: AuthService,
    private userService: UserService,
    private onlineStateSvc: OnlineStateService,
    private bingoFileService: BingoFileService
  ) {
  }

  ngOnInit(): void {
    // TODO : check if online, check local storage if not
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      this.online = state
      if (this.online) {
        this.refreshList()
        this.authService.getCurrentUser().subscribe(user => {
          if (user) {
            this.connected = true
            this.userService.getUser(user.uid).subscribe(currentUserData => {
              if (currentUserData) {
                this.currentUser = currentUserData
              }
            })
          }
        })
      } else {
        this.loading = false
      }
    })
  }

  refreshList() {
    this.loading = true
    if (!localStorage.getItem("bingos")) {

      localStorage.setItem("bingos", '[]')

    }
    
    const savedBingos: LocalBingoObject[] = JSON.parse(localStorage.getItem("bingos")!)

    this.localBingoList = []
    console.log(this.localBingoList)
    savedBingos.forEach(bingoObject => {
      if (bingoObject) {
        if (bingoObject.bingoData.title!.length > 15) {
          bingoObject.bingoData.displayName = bingoObject.bingoData.title!.slice(0, 15) + "..."
        } else {
          bingoObject.bingoData.displayName = bingoObject.bingoData.title
        }
        bingoObject.local = true

        this.localBingoList.push(bingoObject)
      }
    })

    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userService.getUser(user.uid).subscribe(userObject => {
          this.currentUser = {uid:''}
          this.currentUser.pseudo = userObject?.pseudo
          this.currentUser.uid = user.uid
          this.isLoggedIn = true
          this.bingoService.getAllBingos().subscribe(bingoArray => {
            this.bingoList = []
            bingoArray.forEach(bingo => {
              if(bingo){
                const bingoObject: LocalBingoObject = {
                  bingoBody: bingo.content,
                  bingoData: bingo,
                  bingoId: bingo.uid,
                  local: false
                };
                if (bingo.owner == this.currentUser.uid) {
                  if (bingo.title!.length > 15) {
                    bingo.displayName = bingo.title!.slice(0, 15) + "..."
                  } else {
                    bingo.displayName = bingo.title
                  }
                  this.bingoList.push(bingoObject)
                }
              }
            })
            this.loading = false
            this.localBingoList.forEach(localBingo=>{
              this.bingoList.push(localBingo)
            })
          })
        })
      }
      this.loading = false
      this.localBingoList.forEach(localBingo=>{
        this.bingoList.push(localBingo)
      })
      
    })
  }

  deleteLocalBingo(bingoObject: LocalBingoObject) {

    this.bingoList.splice(this.bingoList.indexOf(bingoObject),1)

    this.localBingoList.splice(this.localBingoList.indexOf(bingoObject), 1)

    localStorage.setItem("bingos", `${JSON.stringify(this.localBingoList).toString()}`)

  }

  deleteBingo(uid: string) {
    this.loading = true
    this.bingoService.getBingo(uid).subscribe(bingo => {
      if (bingo) {
        this.bingoPrivateRefService.deleteBingoPrivateRef(bingo.uid).then(() => {
          console.log("bp1", this.currentUser.listBingo)
          if (this.currentUser.listBingo) {
            console.log("bp2")
            this.currentUser.listBingo.splice(this.currentUser.listBingo.indexOf(bingo!.uid), 1)
            this.userService.updateUserBingoList(bingo.owner!, this.currentUser.listBingo).then(() => {
              this.bingoService.deleteBingo(uid).then(() => {
                this.bingoFileService.getBingoFileUrl(bingo.uid).subscribe(url => {
                  this.bingoFileService.deleteBingoFile(url)
                })
                this.refreshList()
              })
            })
          }
        })
      }
    })
  }

}
