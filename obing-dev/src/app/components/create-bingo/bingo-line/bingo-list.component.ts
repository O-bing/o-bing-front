import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tile } from 'src/app/types/Tile';

@Component({
  selector: 'app-bingo-list',
  templateUrl: './bingo-list.component.html',
  styleUrls: ['./bingo-list.component.scss']
})
export class BingoListComponent implements OnInit {

  tile : Tile = new Tile(-1);

  tileList : Tile[] = [];

  @Output() tilesCountEvent = new EventEmitter<number>();

  @Output() tilesSaveEvent = new EventEmitter<Tile[]>();

  constructor() {
  }

  ngOnInit(): void {
    this.theAddTile()
    this.tilesSaveEvent.emit(this.tileList)
  }

  theAddTile() : void {
    this.tile = new Tile(this.tileList.length);
    this.tileList.push(this.tile)
  }

  addOrModify(tile : Tile) {
    
    if (tile.state=='empty'){

      tile.setStateToFilled()
      tile.setTileText('')
      this.theAddTile()
      this.tilesCountEvent.emit(this.tileList.length)

    }

    this.tilesSaveEvent.emit(this.tileList)
  }

  deleteTile(deleteTile : Tile){

    this.tileList.splice(deleteTile.id,1)

    this.tileList.forEach(function (tile:Tile) {
      if(tile.id>deleteTile.id){
        tile.id = tile.id - 1;
      }
    });
    this.tilesSaveEvent.emit(this.tileList)
  }

}
