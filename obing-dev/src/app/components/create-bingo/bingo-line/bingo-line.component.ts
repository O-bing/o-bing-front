import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bingo } from 'src/app/class/bingo';
import { Tile } from 'src/app/types/Tile';

@Component({
  selector: 'app-bingo-line',
  templateUrl: './bingo-line.component.html',
  styleUrls: ['./bingo-line.component.scss']
})
export class BingoLineComponent implements OnInit {

  tile: Tile = new Tile(-1);

  tileList: Array<Array<Tile>> = [[]];

  @Input() Bingo?:Bingo

  @Output() tilesCountEvent = new EventEmitter<number>();

  @Output() tilesSaveEvent = new EventEmitter<Array<Array<Tile>>>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.Bingo){
      this.tileList = this.Bingo.content
    }
    this.tileList.push()
    this.theAddTile()
    this.tilesSaveEvent.emit(this.tileList)
  }

  getListLength(): number {
    let count: number = 0
    this.tileList.forEach(line => {
      line.forEach(tile => {
        count += 1
      })
    })

    return count;
  }

  theAddTile(): void {
    this.tile = new Tile(this.getListLength());
    if (this.tileList[this.tileList.length - 1].length >= 5) {
      this.tileList.push([this.tile])
    }
    else if (this.tileList[this.tileList.length - 1].length < 5) {
      this.tileList[this.tileList.length - 1].push(this.tile)
    }
  }

  addOrModify(event:{tile:Tile, isBlank:boolean}) {
    let tile=event.tile

    if (tile.state == 'empty') {

      if(!event.isBlank){
        tile.setStateToFilled()
        tile.setTileText('')
        this.theAddTile()
        this.tilesCountEvent.emit(this.getListLength())
      }
      else{
        tile.setStateToBlank()
        tile.setTileText('')
        this.theAddTile()
        this.tilesCountEvent.emit(this.getListLength())
      }
      

    }

    this.tilesSaveEvent.emit(this.tileList)
  }

  deleteTile(deleteTile: Tile) : void {

    let lineIdTileToDelete:number = 0

    let tileIdToDelete:number = 0

    for (let line:number = 0; line < this.tileList.length; line++){
      for (let tile:number = 0; tile < this.tileList[line].length; tile++){
        if (this.tileList[line][tile].id == deleteTile.id){
          lineIdTileToDelete = line
          tileIdToDelete = tile
        }
      }
    }
    this.tileList[lineIdTileToDelete].splice(tileIdToDelete, 1) // search and delete tile to delete in list

    for (let line:number = lineIdTileToDelete; line < this.tileList.length - 1; line++){ // rearranging the remaining tiles in every line
        this.tileList[line].push(this.tileList[line+1].splice(0,1)[0]) // putting the first tiles from every line above the deleted one in the lower line
        if (this.tileList[line+1].length == 0){ // deleting possible empty line
          this.tileList.splice(line+1,1)
        }
    }

    this.tileList.forEach(line => {
      line.forEach(tile => {
        if (tile.id > deleteTile.id) {
          tile.id = tile.id - 1;
        }
      })
    })
    this.tilesSaveEvent.emit(this.tileList)
    this.tilesCountEvent.emit(this.getListLength())
  }
}