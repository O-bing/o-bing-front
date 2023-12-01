import { Injectable } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OnlineStateService implements OnInit, OnDestroy {

  networkStatus: boolean = false;
  networkStatusSubscribtion: Subscription = Subscription.EMPTY;

  constructor() {}

  ngOnInit(): void {
    this.checkNetworkStatus();
  }

  ngOnDestroy(): void {
    this.networkStatusSubscribtion.unsubscribe();
  }

  checkNetworkStatus() : boolean{
    this.networkStatusSubscribtion = Subscription.EMPTY;
    this.networkStatus = navigator.onLine;
    this.networkStatusSubscribtion = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        this.networkStatus = status;
      });
      this.networkStatusSubscribtion.unsubscribe();
      return this.networkStatus
  }
}
