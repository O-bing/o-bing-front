import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bingo } from 'src/app/class/bingo';
import { LocalBingoObject } from 'src/app/class/localBingoObect';

@Component({
  selector: 'app-bingo-local-card',
  templateUrl: './bingo-local-card.component.html',
  styleUrls: ['./bingo-local-card.component.scss']
})
export class BingoLocalCardComponent {
  
  url: string = ''

  owner: string = ''

  bingoId: string = ''

  bingoObject!: LocalBingoObject

  Bingo:Bingo = { uid: '', numberPlayed: 0 }

  setScrollView: boolean = false
  
  editMod: boolean = false

  accessFormGroup!: FormGroup

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    
    this.accessFormGroup = new FormGroup({
      accessFormControl: new FormControl("0", Validators.required)
    })
    this.route.paramMap.subscribe(params => {
      this.bingoId = params.get('bingoId')!;
    })

    if(localStorage.getItem("bingos")){
      const savedBingos: LocalBingoObject[] = JSON.parse(localStorage.getItem("bingos")!)

      savedBingos.forEach(bingoObject => {
        if(bingoObject.bingoId == this.bingoId){
          this.bingoObject = bingoObject
          this.Bingo = this.bingoObject.bingoData
          this.Bingo.content = this.bingoObject.bingoBody
        }
      })
    }

  }

  ngAfterViewChecked(): void {
    let body = document.getElementById('bodyCard')
    let page = window.innerWidth
    if (!this.setScrollView && body) {
      body.scrollLeft = page / 2
    }
  }

  editBingo(): void {
    this.editMod = true
  }

  updateBingo(): void {
    
  }


  localSave():void {
    console.log("Set up actions to allow user to directly download the updated Bingo, store it in localstorage")
  }

  deleteBingo(uid:string):void{
    console.log(uid)
  }

}
