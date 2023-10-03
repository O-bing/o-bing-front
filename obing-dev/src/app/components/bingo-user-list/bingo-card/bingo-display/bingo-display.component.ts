import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bingo-display',
  templateUrl: './bingo-display.component.html',
  styleUrls: ['./bingo-display.component.scss']
})
export class BingoDisplayComponent implements OnInit {

   @Input() BingoId:string = 'NaN'

  constructor() { }

  ngOnInit(): void {
  }

}
