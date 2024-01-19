import { Component } from '@angular/core';
import { LocalBingoObject } from 'src/app/class/localBingoObect';

@Component({
  selector: 'app-local-bingo-list',
  templateUrl: './local-bingo-list.component.html',
  styleUrls: ['./local-bingo-list.component.scss']
})

export class LocalBingoListComponent {

  bingoUserList: LocalBingoObject[] = []

  constructor() { }

  ngOnInit(): void {

    if (!localStorage.getItem("bingos")) {

      localStorage.setItem("bingos", '[]')

    }

    const savedBingos: LocalBingoObject[] = JSON.parse(localStorage.getItem("bingos")!)

    savedBingos.forEach(bingoObject =>{
      
      if (bingoObject.bingoData.title!.length > 15) {
        bingoObject.bingoData.displayName = bingoObject.bingoData.title!.slice(0, 15) + "..."
      } else {
        bingoObject.bingoData.displayName = bingoObject.bingoData.title
      }
      this.bingoUserList.push(bingoObject)
    })

  }

  refreshList() {

  }

  deleteBingo(uid: string) {

  }

}
