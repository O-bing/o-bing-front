import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-bingo',
  templateUrl: './load-bingo.component.html',
  styleUrls: ['./load-bingo.component.scss']
})
export class LoadBingoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // TODO : check if online, check local storage if not
  }

}
