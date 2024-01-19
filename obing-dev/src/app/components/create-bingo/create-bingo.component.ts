import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Tile } from 'src/app/types/Tile';
import * as bulmaToast from 'bulma-toast'
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { BingoTitleDialogComponent } from './bingo-title-dialog/bingo-title-dialog.component';
import { Router } from '@angular/router';
import { BingoFileService } from 'src/app/@shared/services/bingo-file/bingo-file.service';
import { guid } from 'src/app/utils/guid';
import { BingoService } from 'src/app/@shared/services/bingo/bingo.service';
import { Bingo } from 'src/app/class/bingo';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { BingoNotConnectedDialogComponent } from './bingo-not-connected-dialog/bingo-not-connected-dialog.component';
import { BingoPrivateRefService } from 'src/app/@shared/services/bingo/bingo-private-ref/bingo-private-ref.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';
@Component({
  selector: 'app-create-bingo',
  templateUrl: './create-bingo.component.html',
  styleUrls: ['./create-bingo.component.scss']
})

export class CreateBingoComponent implements OnInit, AfterViewChecked {

  counter: number = 0;

  tilesList: Array<Array<Tile>> = [[]];

  columnsFormat: number = 5;

  rowsFormat: number = 2;

  privateChecked: boolean = false;

  saved: boolean = false;

  connected: boolean = false

  setScrollView: boolean = false

  online: boolean = false

  constructor(
    private dialog: MatDialog,
    private bingoPrivateRefService: BingoPrivateRefService,
    private bingoFileService: BingoFileService,
    private bingoService: BingoService,
    private authService: AuthService,
    private router: Router,
    private onlineStateSvc: OnlineStateService
  ) { }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      this.online = state
      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          this.connected = true
        }
      })
    })

  }

  ngAfterViewChecked() {
    let creationPanel = document.getElementById('creation-panel')
    let page = window.innerWidth
    if (!this.setScrollView && creationPanel) {
      creationPanel.scrollLeft = page / 2
      this.setScrollView = true
    }
  }

  checkFormat(event: Event): void {
    const columnsFormat: number = Number((event.target as any).value);
    if (columnsFormat) {
      this.columnsFormat = columnsFormat
    }
  }

  checkLinesFormat(event: Event): void {
    const rowsFormat: number = Number((event.target as any).value);
    if (rowsFormat >= 1) {
      this.rowsFormat = rowsFormat
    }
  }

  tilesCount(tilesCount: number): void {
    this.counter = tilesCount - 1
  }

  setTilesList(tilesList: Array<Array<Tile>>): void {
    this.tilesList = tilesList
  }

  autoCompleteBingo(): void {
    // Check if columnsFormat in intput respect rules

    if (this.columnsFormat > 5 || this.columnsFormat <= 1) {
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

    const addTile: Tile | undefined = this.tilesList[this.tilesList.length - 1].pop(); // remove the "Add +" tile which is irrelevant to save, and always at the end
    if (addTile != undefined) {

      // check if tiles match the rows format

      while (this.rowsFormat != this.tilesList.length) {
        if (this.rowsFormat > this.tilesList.length) {
          for (let i: number = 0; i < this.rowsFormat; i++) {
            let placeHolderLine: Array<Tile> = []
            for (let y: number = 1; y < this.columnsFormat + 1; y++) {
              const placeHolderTile = new Tile(this.counter, '')
              placeHolderTile.state = "filled"
              placeHolderLine.push(placeHolderTile)
              this.counter += 1
            }
            this.tilesList[i] = (placeHolderLine)
          }
        } else if (this.rowsFormat < this.tilesList.length) {
          this.counter -= this.tilesList[this.tilesList.length - 1].length
          this.tilesList.pop()
        }
      }

      // check if tiles match the columnsFormat for every line

      for (let i: number = 0; i < this.tilesList.length; i++) {
        while (this.tilesList[i].length != this.columnsFormat) {
          if (this.columnsFormat > this.tilesList[i].length) {
            const placeHolderTile = new Tile(this.counter, '')
            placeHolderTile.state = "filled"
            this.tilesList[i].push(placeHolderTile)
            this.counter += 1
          }
          else if (this.columnsFormat < this.tilesList[i].length) {
            this.counter -= 1
            this.tilesList[i].pop()
          }
        }
      }

      bulmaToast.toast({
        duration: 2000,
        position: 'top-right',
        closeOnClick: true,
        message: 'Completed your bingo to match format.',
        type: 'is-white',
        dismissible: true
      })

      // re-add the "Add" tile in a new line an took it off from counter
      addTile.id = this.counter
      this.tilesList.push([addTile])
    }
  }

  saveBingo(): void {
    if (this.tilesList[this.tilesList.length - 1].length == 0) {
      this.tilesList.pop()
    }
    if (!this.saved) {
      if (this.tilesList.length > 1) {
        if (this.columnsFormat > 5 || this.columnsFormat <= 1) {
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
          this.tilesList[this.tilesList.length - 1].pop()
          if (this.tilesList[this.tilesList.length - 1].length == 0) {
            this.tilesList.pop()
          }
          this.openDialog(this.tilesList)
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

  private openDialog(tiles: Array<Array<Tile>>) {

    const dialogName = this.dialog.open(BingoTitleDialogComponent);

    dialogName.afterClosed().subscribe(titleBingo => {
      const json = JSON.stringify(tiles);
      const ID = guid.uuidv4();
      this.bingoFileService.uploadBingoFile(json, ID);
      const bingo: Bingo = {
        uid: ID,
        title: titleBingo,
        owner: "",
        creationDate: Date.now(),
        numberPlayed: 0
      }

      if (this.online) {
        this.authService.getCurrentUser().subscribe(user => {
          if (!user) {
            bingo.owner = user!.uid
            bingo.content = json
            this.bingoService.createBingo(bingo, ID).then(() => {
              if (this.privateChecked){
                this.bingoPrivateRefService.addBingoPrivateRef(ID, user!.uid, this.privateChecked);
              }
              this.saved = true
            }
            )
            this.router.navigate(['/']);
          }
          else {
            this.notConnectedSave(bingo, ID, json)
          }
        })
      } else {
        this.notConnectedSave(bingo, ID, json)

      }
    }
    );
  }

  notConnectedSave(bingoData:Bingo, bingoId:string, bingoBody:string) {
    const dialogSave = this.dialog.open(BingoNotConnectedDialogComponent);
    let instance = dialogSave.componentInstance;
    instance.BingoBody = bingoBody
    instance.BingoData = bingoData
    instance.BingoId = bingoId
  }

}
