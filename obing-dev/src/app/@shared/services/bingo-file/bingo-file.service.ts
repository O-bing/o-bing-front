import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class BingoFileService {

  constructor(private storage:AngularFireStorage) { }

  getBingoFile(idToGet:string){

  }

  uploadBingoFile(json:string, ID:string){
    const blob = new Blob([json as BlobPart], {type:"text/json"});
    return this.storage.upload("Bingos/"+ID+".json", blob);
  }

}
