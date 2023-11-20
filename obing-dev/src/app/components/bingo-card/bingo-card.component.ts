import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { BingoFileService } from 'src/app/@shared/services/bingo-file/bingo-file.service';
import { BingoPrivateRefService } from 'src/app/@shared/services/bingo/bingo-private-ref/bingo-private-ref.service';
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

  Bingo: Bingo = { uid: '', numberPlayed: 0 }

  url: string = ''

  access: boolean = true

  owner: string = ''

  constructor(private bingoService: BingoService, private bingoPrivateRefService: BingoPrivateRefService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    var container = document.getElementById('body')!;
    container.scrollLeft = container.scrollWidth / 2;
    this.route.paramMap.subscribe(params => {
      this.bingoId = params.get('bingoId')!;
      this.bingoPrivateRefService.getBingoPrivateRef(this.bingoId).subscribe(privateRef => { // Step 1 : check the bingo access ref
        if (privateRef) {
          this.access = privateRef.isPrivate
          this.owner = privateRef.owner
          if (privateRef.isPrivate) { // private
            this.authService.getCurrentUser().subscribe(user => { // Step 2 : if private, check if current user is the owner of the bingo
              if (user && user.uid == privateRef.owner)
                this.bingoService.getBingo(this.bingoId).subscribe(bingo => { // Step 3 : get bingo
                  if (bingo) {
                    this.Bingo = bingo
                    if (this.Bingo.creationDate && typeof this.Bingo.creationDate === 'number') {
                      this.Bingo.creationDate = new Date(this.Bingo.creationDate)
                      this.Bingo.content = JSON.parse(this.Bingo.content)
                    }
                  }
                })
            })
          }
          else { // public
            this.bingoService.getBingo(this.bingoId).subscribe(bingo => { // Step 2 (bis) : if public, get user
              if (bingo) {
                this.Bingo = bingo
                if (this.Bingo.creationDate && typeof this.Bingo.creationDate === 'number') {
                  this.Bingo.creationDate = new Date(this.Bingo.creationDate)
                  this.Bingo.content = JSON.parse(this.Bingo.content)
                }
              }
            })
          }
        }
      })
    });
  }
}