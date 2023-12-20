import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Bingo } from 'src/app/class/bingo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BingoService {

  bingoCollection : AngularFirestoreCollection<Bingo>;

  constructor(
    private store: AngularFirestore,
    private storage:AngularFireStorage // to get bingos illustrations later
  ) {
    this.bingoCollection = this.store.collection<Bingo>('bingos');
  }

  getBingo(uid:string):Observable<Bingo| undefined>{
    return this.bingoCollection.doc<Bingo>(uid).valueChanges();
  }

  createBingo(bingo:Bingo, uid:string):Promise<void>{
    return this.bingoCollection.doc(uid).set(bingo);
  }

  updateBingo(bingo:Bingo){
    return this.bingoCollection.doc<Bingo>(bingo.uid).update({
      content: JSON.stringify(bingo.content)
    });
  }

  deleteBingo(postId:string):Promise<void>{
    return this.bingoCollection.doc(postId).delete()
  }

  getAllBingos():Observable<Bingo[]>{
    return this.bingoCollection.valueChanges()
  }

  getUserBingos(userId:string):any{

    return this.bingoCollection.ref.get()
  }

}
