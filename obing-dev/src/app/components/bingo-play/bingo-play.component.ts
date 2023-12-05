import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bingo-play',
  templateUrl: './bingo-play.component.html',
  styleUrls: ['./bingo-play.component.scss']
})
export class BingoPlayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // TODO : check if online, check local storage if not
  }

}
