import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask} from '@angular/fire/compat/storage';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BingoFileService {

  constructor(private storage:AngularFireStorage) { }
  

  getBingoFileUrl(idToGet:string): Observable<any>{
    return this.storage.ref("Bingos/"+idToGet+".json").getDownloadURL()
  }

  getBingoFileMetadata(fileUrl:any): Observable<any>{
    return this.storage.refFromURL(fileUrl).getMetadata()
  }

  uploadBingoFile(json:string, ID:string):AngularFireUploadTask{
    const blob = new Blob([json as BlobPart], {type:"text/json"});
    return this.storage.upload("Bingos/"+ID+".json", blob);
  }

}
