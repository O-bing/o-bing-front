import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User, UserRank } from 'src/app/class/user';
import { RoutesServices } from '../../RouteServices';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>;

  constructor(
    private store: AngularFirestore,
    private storage:AngularFireStorage // to get profile pictures later
  ) {
    this.userCollection = this.store.collection<User>(RoutesServices.Users);
  }

  getUser(uid:string){
    return this.userCollection.doc<User>(uid).valueChanges();
  }

  newUser(user:User, uid:string){
    user.rank=UserRank.UserLambda;
    return this.userCollection.doc(uid).set(user);
  }

}
