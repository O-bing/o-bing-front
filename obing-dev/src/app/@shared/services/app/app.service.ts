import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Version } from 'src/app/class/version';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  versionCollection : AngularFirestoreCollection<Version>;

  constructor(
    private store: AngularFirestore
  ) {
    this.versionCollection = this.store.collection<Version>('version');
  }

  getCurrentVersion():Observable<Version[]>{
    return this.versionCollection.valueChanges();
  }

}