import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Bingo } from 'src/app/class/bingo';
import { RoutesServices } from '../../RouteServices';

@Injectable({
  providedIn: 'root'
})
export class BingoService {

  bingoCollection : AngularFirestoreCollection<Bingo>;

  constructor(
    private store: AngularFirestore,
    private storage:AngularFireStorage // to get bingos illustrations later
  ) {
    this.bingoCollection = this.store.collection<Bingo>(RoutesServices.Bingos);
  }

  getBingo(uid:string){
    return this.bingoCollection.doc<Bingo>(uid).valueChanges();
  }

  createBingo(bingo:Bingo, uid:string){
    return this.bingoCollection.doc(uid).set(bingo);
  }

  updateBingo(){

  }

  deleteBingo(postId:string){
    return this.bingoCollection.doc(postId).delete()
  }

  getAllBingos(){
    return this.bingoCollection.valueChanges()
  }

}
