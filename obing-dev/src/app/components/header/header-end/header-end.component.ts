import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-header-end',
  templateUrl: './header-end.component.html',
  styleUrls: ['./header-end.component.scss']
})
export class HeaderEndComponent {

  @Input() CurrentUser : User = {};

  @Input() DisplayProfile: boolean = false;

  @Input() DisplayConnect: boolean = false;
  
  @Output() CloseClick = new EventEmitter();

  constructor(private el:ElementRef) {}

  closeClick(){
    this.CloseClick.emit()
  }

}
