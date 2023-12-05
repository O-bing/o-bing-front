import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-random-bingo',
  templateUrl: './random-bingo.component.html',
  styleUrls: ['./random-bingo.component.scss']
})
export class RandomBingoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // TODO : check if online, check local storage if not
  }

}
