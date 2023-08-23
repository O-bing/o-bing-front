import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() CurrentUser!: User;

  imgProfileURL:string="";

  constructor() { }

  ngOnInit(): void {
  }

}
