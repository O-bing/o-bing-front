import { Component, NgZone, OnInit } from '@angular/core';
import { BingoSaveLogInComponent } from './bingo-save-log-in/bingo-save-log-in.component';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';
import { Bingo } from 'src/app/class/bingo';

@Component({
  selector: 'app-bingo-not-connected-dialog',
  templateUrl: './bingo-not-connected-dialog.component.html',
  styleUrls: ['./bingo-not-connected-dialog.component.scss']
})
export class BingoNotConnectedDialogComponent implements OnInit {

  online:boolean=true

  BingoId!: string;
  BingoBody! : string
  BingoData! : Bingo

  constructor(
    private dialogRef: MatDialogRef<BingoNotConnectedDialogComponent>,
    private ngZone: NgZone,
    private dialog: MatDialog,
    public authService: AuthService,
    private onlineStateSvc: OnlineStateService
    ) { }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().then(state => {
      this.online = state
    })
  }

  ngAfterViewChecked() {
    if (!this.online) {
      let loginButton = document.querySelector('button.logInAndSave') as HTMLElement
      this.onfOffButtons(loginButton)
    }
  }

  private onfOffButtons(button: HTMLElement) {
    button.style.backgroundColor = 'rgb(93, 96, 96)';
    button.style.color = 'rgb(48, 47, 47)';
    button.title = 'This feature is disabled while offline';
    button.setAttribute('disabled', 'true');
  }

  localSave(bingoData: Bingo, bingoId: string, bingoBody:string) {

    if (!localStorage.getItem("bingos")) {

      localStorage.setItem("bingos", '[]')

    }

    const savedBingos: Array<Object> = JSON.parse(localStorage.getItem("bingos")!)

    const localBingo = {
      bingoId: bingoId,
      bingoData: bingoData,
      bingoBody: JSON.parse(bingoBody)
    }
    
    savedBingos.push(localBingo)

    localStorage.setItem("bingos", `${JSON.stringify(savedBingos).toString()}`)

    this.ngZone.run(() => {
      this.dialogRef.close(true)
    });
  }

  logInAndSave() {
    const dialogLogInConfig = new MatDialogConfig();
    dialogLogInConfig.disableClose = true;
    dialogLogInConfig.autoFocus = true;
    const dialogLogIn = this.dialog.open(BingoSaveLogInComponent, dialogLogInConfig);
    dialogLogIn.afterClosed().subscribe((logged) => {
      if(logged){
        this.ngZone.run(() => {
          this.dialogRef.close(true)
        });
      }
    })
  }
  
  closeDialog() {
    this.ngZone.run(() => {
      this.dialogRef.close(false)
    });
  }

}
