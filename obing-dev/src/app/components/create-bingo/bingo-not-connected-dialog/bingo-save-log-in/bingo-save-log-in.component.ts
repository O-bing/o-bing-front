import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';

@Component({
  selector: 'app-bingo-save-log-in',
  templateUrl: './bingo-save-log-in.component.html',
  styleUrls: ['./bingo-save-log-in.component.scss']
})
export class BingoSaveLogInComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<BingoSaveLogInComponent>, private ngZone: NgZone, public authService: AuthService, private onlineStateSvc: OnlineStateService) {
    const state = this.onlineStateSvc.checkNetworkStatus()
    if (state) {
      console.log("You're currently online")
    } else {
      console.log("You're currently offline")
    }
  }

  ngOnInit(): void {
  }

  logIn(userName: string, userPassword: string) {
    this.authService.signIn(userName, userPassword).then((result) => {
      if (result) {
        this.ngZone.run(() => {
          this.dialogRef.close(result)
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
