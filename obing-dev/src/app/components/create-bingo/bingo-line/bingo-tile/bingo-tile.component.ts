import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tile } from '../../../../types/Tile';

@Component({
  selector: 'app-bingo-tile',
  templateUrl: './bingo-tile.component.html',
  styleUrls: ['./bingo-tile.component.scss']
})
export class BingoTileComponent implements OnInit {

  @Output() tileClickEvent = new EventEmitter<{tile:Tile, isBlank:boolean}>();

  @Output() deleteTileClickEvent = new EventEmitter<Tile>();

  @Input() tile : Tile = new Tile(-1);

  constructor() {
  }

  ngOnInit(): void {
  }

  addOrChange(event:Event, blank:boolean) : void {
    if(this.tile.state=='filled'){
      this.tile.text = (event.target as any).value;
    }
    this.tileClickEvent.emit({tile:this.tile, isBlank:blank})
  }

  deleteTile() : void {
    this.deleteTileClickEvent.emit(this.tile)
  }

}
