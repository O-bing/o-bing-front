import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BingoFileService } from 'src/app/@shared/services/bingo-file/bingo-file.service';
import { BingoService } from 'src/app/@shared/services/bingo/bingo.service';
import { Bingo } from 'src/app/class/bingo';

@Component({
  selector: 'app-bingo-card',
  templateUrl: './bingo-card.component.html',
  styleUrls: ['./bingo-card.component.scss']
})
export class BingoCardComponent implements OnInit {

  bingoId: string = "";

  Bingo: Bingo = { uid: "", numberPlayed: 0 }

  BingoBody: string = ''

  url : string = ''

  constructor(private bingoService: BingoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bingoId = params.get('bingoId')!;
      this.bingoService.getBingo(this.bingoId).subscribe(bingo => {
        if (bingo != undefined) {
          this.Bingo = bingo
          if (this.Bingo.creationDate && typeof this.Bingo.creationDate === 'number') {
            this.Bingo.creationDate = new Date(this.Bingo.creationDate)
          }
          
        }
      })
    }
    );

  }

}
