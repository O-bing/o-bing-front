import { Component, ElementRef, EventEmitter, HostListener, Input, NgZone, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';

@Component({
  selector: 'app-header-connect',
  templateUrl: './header-connect.component.html',
  styleUrls: ['./header-connect.component.scss']
})
export class HeaderConnectComponent implements OnInit {

  
  @Input() DisplayConnect : boolean = false;

  @Output() CloseClick = new EventEmitter();

  closeClicked : boolean = false;

  shown: boolean = false

  constructor(public authService: AuthService, private el:ElementRef) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(result=>{
      this.shown = true
    })
  }

  @HostListener('document:click', ['$event.target'])
  clickInOut(target:any){
    const clickedIn = this.el.nativeElement.contains(target)
    if (!clickedIn){
      if(this.DisplayConnect && this.shown){
        this.shown = false
        this.CloseClick.emit()
      }
    }else{
      this.shown = true
    }
  }

  closeClick(){
    this.closeClicked = true
    this.CloseClick.emit()
  }

  login(username: string, password: string) {
    this.authService.signIn(username, password).then(() => {
        this.closeClick()
        location.reload();
      }
    )
  }

  ForgotPassword(passwordResetEmail: string) {
    this.authService.ForgotPassword(passwordResetEmail);
  }

}
