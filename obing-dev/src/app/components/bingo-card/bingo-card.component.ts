import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { BingoPrivateRefService } from 'src/app/@shared/services/bingo/bingo-private-ref/bingo-private-ref.service';
import { BingoService } from 'src/app/@shared/services/bingo/bingo.service';
import { Bingo } from 'src/app/class/bingo';
import { BingoNotConnectedDialogComponent } from '../create-bingo/bingo-not-connected-dialog/bingo-not-connected-dialog.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bingo-card',
  templateUrl: './bingo-card.component.html',
  styleUrls: ['./bingo-card.component.scss']
})
export class BingoCardComponent implements OnInit, AfterViewChecked {

  bingoId: string = "";

  Bingo: Bingo = { uid: '', numberPlayed: 0 }

  url: string = ''

  private: boolean = true

  owner: string = ''

  loading: boolean = true

  setScrollView: boolean = false

  editMod:boolean = false

  accessFormGroup!:FormGroup

  constructor(
    private bingoService: BingoService,
    private bingoPrivateRefService: BingoPrivateRefService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.accessFormGroup = new FormGroup({
      accessFormControl: new FormControl("0", Validators.required)
    })
    // TODO : check if online, check local storage if not
    this.route.paramMap.subscribe(params => {
      this.bingoId = params.get('bingoId')!;
      this.bingoPrivateRefService.getBingoPrivateRef(this.bingoId).subscribe(privateRef => { // Step 1 : check the bingo access ref
        if (privateRef) {
          this.private = privateRef.isPrivate
          if(privateRef.isPrivate){
            this.accessFormGroup.get('accessFormControl')!.setValue("1")
          }
          this.owner = privateRef.owner
          if (privateRef.isPrivate) { // private
            this.authService.getCurrentUser().subscribe(user => { // Step 2 : if private, check if current user is the owner of the bingo
              if (user && user.uid == privateRef.owner) {
                this.bingoService.getBingo(this.bingoId).subscribe(bingo => { // Step 3 : get bingo
                  if (bingo) {
                    this.Bingo = bingo
                    if (this.Bingo.creationDate && typeof this.Bingo.creationDate === 'number') {
                      this.Bingo.creationDate = new Date(this.Bingo.creationDate)
                      this.Bingo.content = JSON.parse(this.Bingo.content)
                      this.loading = false
                    }
                  }
                })
              }
            })
          }
        } else { // public
          this.bingoService.getBingo(this.bingoId).subscribe(bingo => { // Step 2 (bis) : if public, get user
            if (bingo) {
              this.Bingo = bingo
              if (this.Bingo.creationDate && typeof this.Bingo.creationDate === 'number') {
                this.Bingo.creationDate = new Date(this.Bingo.creationDate)
                this.Bingo.content = JSON.parse(this.Bingo.content)
                this.loading = false
              }
            }
          })
        }
      })
    });
  }

  ngAfterViewChecked():void{
    let body = document.getElementById('bodyCard')
    let page = window.innerWidth
    if (!this.setScrollView && body){
      body.scrollLeft = page/2
    }
  }

  editBingo():void{
    this.editMod = true
  }

  updateBingo():void{
    this.Bingo.content[this.Bingo.content.length-1].pop()
    if(this.Bingo.content[this.Bingo.content.length-1].length == 0){
      this.Bingo.content.pop()
    }
    this.authService.getCurrentUser().subscribe(user => {
      if (user && this.Bingo.owner==user.uid) {
        this.bingoService.updateBingo(this.Bingo).then(() => {
          let privateValue = this.accessFormGroup.get('accessFormControl')!.value
          if(privateValue=='0'){
            this.bingoPrivateRefService.deleteBingoPrivateRef(this.Bingo.uid)
          }else{
            this.bingoPrivateRefService.addBingoPrivateRef(this.Bingo.uid,this.Bingo.owner!, true)
          }
          
        }
        )
      } else {
        this.localSave()
      }
    })
    this.editMod = false
  }


  localSave() {
    const dialogSave = this.dialog.open(BingoNotConnectedDialogComponent);
    console.log("Set up actions to allow user to directly download the updated Bingo, store it in localstorage")
  }

}
