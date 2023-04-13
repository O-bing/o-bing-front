import { Component, OnInit } from '@angular/core';
import { Tile } from 'src/app/types/Tile';
import * as bulmaToast from 'bulma-toast'

@Component({
  selector: 'app-create-bingo',
  templateUrl: './create-bingo.component.html',
  styleUrls: ['./create-bingo.component.scss']
})
export class CreateBingoComponent implements OnInit {

  counter: number = 0;

  tilesList: Tile[] = [];

  format: number = 5;

  linesFormat: number = 2;

  saved: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  checkFormat(event: Event): void {
    const format: number = Number((event.target as any).value);
    if (format) {
      this.format = format
    }
  }

  checkLinesFormat(event: Event): void {
    const linesFormat: number = Number((event.target as any).value);
    if (linesFormat >= 1) {
      this.linesFormat = linesFormat
    }
  }

  tilesCount(tilesCount: number): void {
    this.counter = tilesCount - 1
  }

  setTilesList(tilesList: Tile[]): void {
    this.tilesList = tilesList
  }

  autoCompleteBingo(): void {

    // Check if format in intpu respect rules

    if (this.format > 5 || this.format <= 1) {
      bulmaToast.toast({
        duration: 3000,
        position: 'top-right',
        closeOnClick: true,
        message: 'Cannot auto complete : tiles per line must be between 2 & 5 included.',
        type: 'is-danger',
        dismissible: true
      })

      return;
    }

    const addTile: Tile | undefined = this.tilesList.pop(); // remove the "Add +" tile which is irrelevant to save, and always at the end
    if (addTile != undefined) {

      // check if tiles match the max tile per line format

      if (this.tilesList.length % this.format != 0 || this.tilesList.length == 0) {
        while (this.tilesList.length % this.format != 0 || this.tilesList.length == 0) {
          const placeHolderTile = new Tile(this.tilesList.length - 1, 'Placeholder')
          placeHolderTile.setStateToFilled()
          this.tilesList.push(placeHolderTile)
          this.counter += 1
        }
        bulmaToast.toast({
          duration: 2000,
          position: 'top-right',
          closeOnClick: true,
          message: 'Completed your bingo to match format.',
          type: 'is-info',
          dismissible: true
        })
      }

      // check if tiles match the max lines format

      if (this.tilesList.length % (this.linesFormat * this.format) != 0 || this.tilesList.length == 0) {
        while (this.tilesList.length % (this.linesFormat * this.format) != 0 || this.tilesList.length == 0) {
          const placeHolderTile = new Tile(this.tilesList.length - 1, 'Placeholder')
          placeHolderTile.setStateToFilled()
          this.tilesList.push(placeHolderTile)
          this.counter += 1
        }
      }

      this.tilesList.push(addTile)
    }
  }

  saveBingo(): void {
    if (!this.saved) {
      if (this.tilesList.length >= 1) {
        if (this.format > 5 || this.format <= 1) {
          bulmaToast.toast({
            duration: 3000,
            position: 'top-right',
            closeOnClick: true,
            message: 'Be careful : tiles per line must be between 2 & 5 included.',
            type: 'is-danger',
            dismissible: true
          })
        }
        else {
          this.autoCompleteBingo()
          this.tilesList.pop()
          this.saved = true
          this.toJson(this.format, this.linesFormat, this.tilesList)
        }
      }
      else {
        bulmaToast.toast({
          duration: 2000,
          position: 'top-right',
          closeOnClick: true,
          message: 'Your bingo is empty.',
          type: 'is-warning',
          dismissible: true
        })
      }
    }
    else {
      console.log("Already saved, must redirect")
    }
  }

  private toJson(format: number, linesFormat: number, tiles: Tile[]) {

  }

}
