import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bingo-title-dialog',
  templateUrl: './bingo-title-dialog.component.html',
  styleUrls: ['./bingo-title-dialog.component.scss']
})

export class BingoTitleDialogComponent implements OnInit {

  form:FormGroup;

  constructor(private dialogRef:MatDialogRef<BingoTitleDialogComponent>, private ngZone: NgZone) {
    this.form = new FormGroup({
      'titleForm': new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  save():void{
    let title = new Date().getTime()
    if (this.form.get('titleForm')!.value != ''){
      title = this.form.get('titleForm')!.value
    }
    this.ngZone.run(() => {
      this.dialogRef.close(title)
    });
  }


}
