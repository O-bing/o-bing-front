import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleDocumentService {

  constructor(
    private titleService: Title
  ) {
  }

  setTitlePage(title: string) : void {
    this.titleService.setTitle(`MyApp - ${title}`);
  }
}
