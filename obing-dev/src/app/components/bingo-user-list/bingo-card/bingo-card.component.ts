import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BingoFileService } from 'src/app/@shared/services/bingo-file/bingo-file.service';
import { BingoService } from 'src/app/@shared/services/bingo/bingo.service';
import { Bingo } from 'src/app/class/bingo';
import { Tile } from 'src/app/types/Tile';

@Component({
  selector: 'app-bingo-card',
  templateUrl: './bingo-card.component.html',
  styleUrls: ['./bingo-card.component.scss']
})
export class BingoCardComponent implements OnInit {

  
  @Output() tilesCountEvent = new EventEmitter<number>();

  @Output() tilesSaveEvent = new EventEmitter<Array<Array<Tile>>>();

  bingoId: string = "";

  Bingo: Bingo = { uid: "", numberPlayed: 0 }

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
            this.Bingo.content = JSON.parse(this.Bingo.content)
            console.log(this.Bingo.content)
          }
        }
      })
    });
  }

}
