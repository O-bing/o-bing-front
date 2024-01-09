import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { BingoService } from 'src/app/@shared/services/bingo/bingo.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';

@Component({
  selector: 'app-bingo-search',
  templateUrl: './bingo-search.component.html',
  styleUrls: ['./bingo-search.component.scss']
})
export class BingoSearchComponent implements OnInit {

  online:boolean=false

  constructor(
    private onlineStateSvc: OnlineStateService,
    private authService: AuthService,
    private bingoService : BingoService
    ) { }

  ngOnInit(): void {
    // TODO : check if online, check local storage if not
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      this.online = state
      if (this.online){
        this.authService.getCurrentUser().subscribe(user=>{
          if(user){
            this.bingoService.getUserBingos(user.uid)
          }
        })
      }
    })
  }

}
