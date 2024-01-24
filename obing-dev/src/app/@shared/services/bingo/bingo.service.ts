import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Bingo } from 'src/app/class/bingo';
import { Observable } from 'rxjs';
import { LocalBingoObject } from 'src/app/class/localBingoObect';
import { UserService } from '../user/user.service';

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
      content: JSON.stringify(bingo.content),
      updateDate: Date.now()
    });
  }

  deleteBingo(postId:string):Promise<void>{
    return this.bingoCollection.doc(postId).delete()
  }

  getAllBingos():Observable<Bingo[]>{
    return this.bingoCollection.valueChanges()
  }

  syncBingos(userId:string, userListBingo: string[]):any{
    const localBingos: LocalBingoObject[] = JSON.parse(localStorage.getItem("bingos")!)

    console.log(userId)

    console.log(userListBingo)

    console.log(localBingos)

    return;
  }

  }

