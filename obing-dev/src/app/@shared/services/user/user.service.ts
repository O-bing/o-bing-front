import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User, UserRank } from 'src/app/class/user';
import { RoutesServices } from '../../RouteServices';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { guid } from 'src/app/utils/guid';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>;

  constructor(
    private store: AngularFirestore,
    private storage: AngularFireStorage,
    public afAuth: AngularFireAuth,
  ) {
    this.userCollection = this.store.collection<User>(RoutesServices.Users);
  }

  getUser(uid: string) {
    return this.userCollection.doc<User>(uid).valueChanges();
  }

  newUser(user: User, uid: string) {
    user.rank = UserRank.UserLambda;
    const userStaticImgSubscription: Subscription = this.getStaticUserPhoto().subscribe(res => {
      user.imgProfileRef = guid.uuidv4() + '.png'
      console.log(res)
      this.uploadUserPhoto(res, user.imgProfileRef);
      this.userCollection.doc(uid).set(user);
    })
  }

  deletUser(userId: string) {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        this.userCollection.doc(userId).delete().then(res => {
          console.log(res);
          user.delete()
        }
        ).catch(error => console.log(error));
      }
    });
  }

  updatePassword(newPassword: string) {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        user.updatePassword(newPassword).catch(error =>
          alert(error)
        );
      }
    });
  }

  updateUserDescription(idProfile: string, newDescription: string) {
    return this.userCollection.doc<User>(idProfile).update({
      description: newDescription
    });
  }

  updateImgProfileRef(idProfile: string, newImageId: string) {
    console.log(idProfile, newImageId)
    return this.userCollection.doc<User>(idProfile).update({
      imgProfileRef: newImageId
    });
  }

  updatePseudo(idProfile: string, newPseudo: string) {
    return this.userCollection.doc<User>(idProfile).update({
      pseudo: newPseudo
    });
  }

  getStaticUserPhoto() {
    return this.storage.ref('Static/' + '48f6eaz4f8ez4az6f4ea8f4a5faz4f8af6azf4a2f1afza8f4za7azfa.png').getDownloadURL()
  }

  getUserPhoto(idUserPhoto: string) {
    return this.storage.ref('ImgProfile/' + idUserPhoto).getDownloadURL();
  }

  uploadUserPhoto(imgToUpload: File, idImage: string) {
    return this.storage.upload('ImgProfile/' + idImage, imgToUpload);
  }

  deleteUserPhoto(idUserPhoto: string) {
    return this.storage.ref('ImgProfile/' + idUserPhoto).delete();
  }



}
