import { Injectable } from '@angular/core';
import { Version } from 'src/app/class/version';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  versionFile

  constructor(
  ) {
    this.versionFile = require('/src/app/utils/version.json')
  }

  getCurrentVersion():Version{
    const version : Version = {
      versionId:this.versionFile.versionId,
      date:this.versionFile.date
    }
    return version
  }

}