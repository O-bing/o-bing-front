import { Component, Input, OnInit } from '@angular/core';
import { Bingo } from 'src/app/class/bingo';

@Component({
  selector: 'app-bingo-card',
  templateUrl: './bingo-card.component.html',
  styleUrls: ['./bingo-card.component.scss']
})
export class BingoCardComponent implements OnInit {

  @Input() Bingo!:Bingo

  constructor() { }

  ngOnInit(): void {
  }

}
