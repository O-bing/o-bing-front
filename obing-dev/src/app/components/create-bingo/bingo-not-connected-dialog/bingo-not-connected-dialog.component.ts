import { Component, NgZone, OnInit } from '@angular/core';
import { BingoSaveLogInComponent } from './bingo-save-log-in/bingo-save-log-in.component';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';

@Component({
  selector: 'app-bingo-not-connected-dialog',
  templateUrl: './bingo-not-connected-dialog.component.html',
  styleUrls: ['./bingo-not-connected-dialog.component.scss']
})
export class BingoNotConnectedDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<BingoNotConnectedDialogComponent>, private ngZone: NgZone, private dialog: MatDialog, public authService: AuthService) { }

  ngOnInit(): void {
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

}
