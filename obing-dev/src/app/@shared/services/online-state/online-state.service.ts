import { Injectable } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
import isOnline from 'is-online';
import { Subscription } from 'rxjs';

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
  }

  async checkNetworkStatus(){
    return await isOnline()
  }
}
