import { Component, ElementRef, EventEmitter, HostListener, Input, NgZone, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@shared/services/auth/auth.service';
import { OnlineStateService } from 'src/app/@shared/services/online-state/online-state.service';

@Component({
  selector: 'app-header-connect',
  templateUrl: './header-connect.component.html',
  styleUrls: ['./header-connect.component.scss']
})
export class HeaderConnectComponent implements OnInit {


  @Input() DisplayConnect: boolean = false;

  @Output() CloseClick = new EventEmitter();

  closeClicked: boolean = false;

  shown: boolean = false

  online:boolean = true

  constructor(
    public authService: AuthService,
    private el: ElementRef,
    private onlineStateSvc: OnlineStateService,
    ) { }

  ngOnInit(): void {
    this.onlineStateSvc.checkNetworkStatus().subscribe(state => {
      this.online = state
      this.authService.getCurrentUser().subscribe(() => {
        this.shown = true
      })
    })
  }

  @HostListener('document:click', ['$event.target'])
  clickInOut(target: any) {
    const clickedIn = this.el.nativeElement.contains(target)
    if (!clickedIn) {
      if (this.DisplayConnect && this.shown) {
        this.shown = false
        this.CloseClick.emit()
      }
    } else {
      this.shown = true
    }
  }

  closeClick() {
    this.closeClicked = true
    this.CloseClick.emit()
  }

  login(username: string, password: string) {
    if ((username == "" || password == "") && this.online) {
      window.alert("Email and/or password is empty")
    } else {
      this.authService.signIn(username, password)
        .then(signInAttempt => {
          if (signInAttempt) {
            this.closeClick()
            location.reload();
          }
        }
        ).catch(e => {
          console.log(e)
        })
    }

  }

  ForgotPassword(passwordResetEmail: string) {
    this.authService.ForgotPassword(passwordResetEmail);
  }

}
