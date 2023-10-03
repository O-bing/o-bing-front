import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { RouteData } from '../../pages';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private routeData: BehaviorSubject<RouteData |null>;

  constructor(private store: AngularFirestore) {
    this.routeData = new BehaviorSubject<RouteData | null>(null);
  }

  getRouteData() {
    return this.routeData.asObservable().pipe(filter(data => !!data));
  }

  setRouteData(data: RouteData) {
    this.routeData.next(data);
  }
}