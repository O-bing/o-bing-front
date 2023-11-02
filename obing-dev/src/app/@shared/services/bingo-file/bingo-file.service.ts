import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BingoFileService {

  constructor(private storage:AngularFireStorage) { }

  getBingoFile(idToGet:string):Observable<Blob> | undefined{
    return ;
  }

  uploadBingoFile(json:string, ID:string):AngularFireUploadTask{
    const blob = new Blob([json as BlobPart], {type:"text/json"});
    return this.storage.upload("Bingos/"+ID+".json", blob);
  }

}
