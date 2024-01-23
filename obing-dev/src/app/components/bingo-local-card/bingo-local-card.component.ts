import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    
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

    const savedBingos: LocalBingoObject[] = JSON.parse(localStorage.getItem("bingos")!)
    
    this.Bingo.content[this.Bingo.content.length - 1].pop()
    if (this.Bingo.content[this.Bingo.content.length - 1].length == 0) {
      this.Bingo.content.pop()
    }

    for (let index = 0; index < savedBingos.length; index++) {
      if (savedBingos[index].bingoId==this.bingoId){
        savedBingos[index].bingoBody = this.Bingo.content
        break
      }      
    }
    
    localStorage.setItem("bingos", `${JSON.stringify(savedBingos).toString()}`)

    this.editMod = false
  }

  deleteBingo(uid:string):void{

    const savedBingos: LocalBingoObject[] = JSON.parse(localStorage.getItem("bingos")!)

    savedBingos.splice(savedBingos.indexOf(this.bingoObject),1)

    localStorage.setItem("bingos", `${JSON.stringify(savedBingos).toString()}`)

    this.router.navigate(['/localBingoList'])
  }

}
