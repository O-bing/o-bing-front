import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { BingoPrivateRefService } from 'src/app/@shared/services/bingo/bingo-private-ref/bingo-private-ref.service';
import { BingoService } from 'src/app/@shared/services/bingo/bingo.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';
import { Bingo } from 'src/app/class/bingo';

@Component({
  selector: 'app-bingo-search',
  templateUrl: './bingo-search.component.html',
  styleUrls: ['./bingo-search.component.scss']
})
export class BingoSearchComponent implements OnInit {

  online: boolean = false

  bingoList: Bingo[] = []

  loading: boolean = true

  constructor(
    private onlineStateSvc: OnlineStateService,
    private bingoService: BingoService,
    private bingoPrivateRefService:BingoPrivateRefService
  ) { }

  ngOnInit(): void {
    // TODO : check if online, check local storage if not
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      this.online = state
      if (this.online) {
        this.bingoService.getAllBingos().subscribe(bingos => {
          if (bingos) {
            this.bingoList = []
            bingos.forEach(bingo => {
              if(bingo){
                this.bingoPrivateRefService.getBingoPrivateRef(bingo.uid).subscribe(privateRef=>{
                  if (privateRef?.isPrivate){
                    bingo.isPrivate=true
                  } else {
                    bingo.isPrivate = false
                  }
                  if (bingo.title!.length > 15) {
                    bingo.displayName = bingo.title!.slice(0, 15) + "..."
                  } else {
                    bingo.displayName = bingo.title
                  }
                  this.bingoList.push(bingo)
                })
              }
            })
            this.loading = false
          }else{
            this.loading = false
          }
        })
      }
      else {
        console.log("Get from localstorage")
        this.loading = false
      }
    })
  }

}
