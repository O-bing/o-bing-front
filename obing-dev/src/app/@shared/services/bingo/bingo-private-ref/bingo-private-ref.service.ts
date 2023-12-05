import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BingoPrivateRef } from 'src/app/class/bingoPrivateRef';


@Injectable({
  providedIn: 'root'
})
export class BingoPrivateRefService {

  
  private refsCollection : AngularFirestoreCollection<BingoPrivateRef>;
  
  constructor(
    private store: AngularFirestore
  ) {
    this.refsCollection = this.store.collection<BingoPrivateRef>('bingosPrivateRefs');
  }

  addBingoPrivateRef(uid:string, owner:string, isPrivate:boolean){
    const bingoPrivateRef : BingoPrivateRef = {isPrivate, owner}
    return this.refsCollection.doc(uid).set(bingoPrivateRef);
  }

  getBingoPrivateRef(refUid:string){
    return this.refsCollection.doc<BingoPrivateRef>(refUid).valueChanges()
  }

  updateBingoPrivateRef(bingoUid:string, isPrivate:boolean){
    return this.refsCollection.doc(bingoUid).update({isPrivate});
  }

  deleteBingoPrivateRef(bingoUid:string){
    return this.refsCollection.doc(bingoUid).delete()
  }
}
