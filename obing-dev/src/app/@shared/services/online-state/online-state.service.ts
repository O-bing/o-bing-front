import { Injectable } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OnlineStateService implements OnInit, OnDestroy {

  networkStatus: boolean = false;
  networkStatusSubscribtion: Subscription = Subscription.EMPTY;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.networkStatusSubscribtion.unsubscribe();
  }

  checkNetworkStatus() : Observable<boolean>{
    return merge(
                                      of(null),
                                      fromEvent(window, 'online'),
                                      fromEvent(window, 'offline')
                                    ).pipe(
                                      map(() => navigator.onLine)
                                    );
  }
}
