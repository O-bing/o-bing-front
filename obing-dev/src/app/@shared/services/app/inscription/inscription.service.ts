import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RoutesServices } from 'src/app/@shared/RouteServices';
import { User } from 'src/app/class/user';


@Injectable({
  providedIn: 'root'
})
export class InscriptionService {


  userCollection: AngularFirestoreCollection<User>;

    private userCollectionSubscription: Subscription;

  constructor(private store: AngularFirestore) {
    
  }

  register(users:User){
    this.store.collection(RoutesServices.Users).add(users);
  } 

  /*checkPseudo(users:User){ //pas oublier de ngOnDestroy avec this.userCollectionSubscription.unsubscribe()
    this.userCollection = this.store.collection<User>(RoutesServices.Users);

    this.userCollectionSubscription = this.userCollection.valueChanges().pipe(
      tap(user => {
        let flag= true;
        user.forEach((u: { pseudo: string; }) => {
          if (u.pseudo == users.pseudo) {
            flag=false;
          }
        });
      }),
    ).subscribe();
    return flag;
  }*/
}