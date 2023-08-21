import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';

import { RouteData } from './pages';
import { AppService } from './services/app/app.service';
import { TitleDocumentService } from './services/title-document/title-document.service';

@Injectable({
  providedIn: 'root'
})
export class RouteResolver implements Resolve<Observable<RouteData>> {
  constructor(
    private titleDocumentService: TitleDocumentService,
    private appService: AppService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!route.data && !!route.data['price']) {
      this.titleDocumentService.setTitlePage(route.data['title']);
    }
    const routeData: RouteData = { title: route.data['title'], page: route.data['page'], navbarName: route.data['navbarName'] };
    this.appService.setRouteData(routeData);

    return of(routeData);
  }
}
