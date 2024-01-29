import { Component } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { BingoService } from 'src/app/@shared/services/bingo/bingo.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';
import { UserService } from 'src/app/@shared/services/user/user.service';
import { LocalBingoObject } from 'src/app/class/localBingoObect';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss'],
  standalone:true,
  imports:
  [
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule
  ]
})

export class SyncComponent {

  // TODO : integrate that small component with profile and list of bingos, to show current bingos sync state

  currentUserConnected: boolean = false

  online: boolean = false

  loading: boolean = true

  syncTarget!: HTMLElement

  toDl: number = 0

  toUpl: number = 0

  toUpd: number = 0

  constructor(
    private authService: AuthService,
    private bingoService: BingoService,
    private onlineStateSvc: OnlineStateService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      this.online = state
      if (this.online) {
        this.authService.getCurrentUser().subscribe(user => {
          if (user) {
            this.currentUserConnected = true
            this.userService.getUser(user.uid).subscribe(userData => {
              if (userData) {
                if (!userData.listBingo) {
                  userData.listBingo = []
                }
                const localBingos: LocalBingoObject[] = JSON.parse(localStorage.getItem("bingos")!)
                for (let index = 0; index < localBingos.length; index++) {
                  const localBingo = localBingos[index];
                  this.bingoService.getBingo(localBingo.bingoId).subscribe(bingo => {
                    if (bingo) {
                      const localBingo = localBingos[index];
                      if (localBingo.bingoId == bingo.uid) {
                        if (localBingo.bingoData.updateDate != bingo.updateDate)
                          console.log("bingo", bingo.uid, "needs to be updated")
                        this.toUpd += 1
                      }
                    } else {
                      console.log("bingo", localBingo.bingoId, "doesn't exist in db, only local")
                      this.toUpl += 1
                    }
                  })
                }
              }
            })
          }
          this.loading = false
        })
      } else {
        this.loading = false
      }
    })
  }

  mouseAction(action: string) {
    this.syncTarget = document.querySelector('img.syncImg') as HTMLElement
    if (action == "enter") {
      this.syncTarget.style.backgroundColor = 'rgb(240, 230, 230)';
    }
    else if (action == "leave") {
      this.syncTarget.style.backgroundColor = 'rgb(255, 255, 255)';
    }
  }

  syncBingos(): void {

  }


}
