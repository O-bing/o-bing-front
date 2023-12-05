import { Component, NgZone, OnInit } from '@angular/core';
import { BingoSaveLogInComponent } from './bingo-save-log-in/bingo-save-log-in.component';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';

@Component({
  selector: 'app-bingo-not-connected-dialog',
  templateUrl: './bingo-not-connected-dialog.component.html',
  styleUrls: ['./bingo-not-connected-dialog.component.scss']
})
export class BingoNotConnectedDialogComponent implements OnInit {

  online:boolean=true

  constructor(
    private dialogRef: MatDialogRef<BingoNotConnectedDialogComponent>,
    private ngZone: NgZone,
    private dialog: MatDialog,
    public authService: AuthService,
    private onlineStateSvc: OnlineStateService
    ) { }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().subscribe(state => {
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

  localSave() {
    console.log("Call future method to convert created bingo into pdf")
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
