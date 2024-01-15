import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User, UserRank } from 'src/app/class/user';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subscription } from 'rxjs';

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
    this.userCollection = this.store.collection<User>('user');
  }

  getUser(uid: string):Observable<User | undefined> {
    return this.userCollection.doc<User>(uid).valueChanges();
  }

  getUsers(): Observable<User[]> {
    return this.userCollection.valueChanges()
  }

  newUser(user: User):Subscription{
    user.rank = UserRank.BingoNewbie;
    return this.getStaticUserPhoto().subscribe(res => {
      this.userCollection.doc(user.uid).set(user);
    })
  }

  deletUser(userId: string): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        this.userCollection.doc(userId).delete().then(res => {
          user.delete()
        }
        ).catch(error => {});
      }
    });
  }

  updatePassword(newPassword: string): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        user.updatePassword(newPassword).catch(error =>
          alert(error)
        );
      }
    });
  }

  updateUserDescription(idProfile: string, newDescription: string): Promise<void> {
    return this.userCollection.doc<User>(idProfile).update({
      description: newDescription
    });
  }

  updateImgProfileRef(idProfile: string, newImageId: string): Promise<void> {
    return this.userCollection.doc<User>(idProfile).update({
      imgProfileRef: newImageId
    });
  }

  updatePseudo(idProfile: string, newPseudo: string): Promise<void> {
    return this.userCollection.doc<User>(idProfile).update({
      pseudo: newPseudo
    });
  }

  getStaticUserPhoto(): Observable<any> {
    return this.storage.ref('Static/' + 'imgProfileRef.png').getDownloadURL()
  }

  getUserPhoto(idUserPhoto: string): Observable<any>  {
    return this.storage.ref('ImgProfile/' + idUserPhoto).getDownloadURL();
  }

  uploadUserPhoto(imgToUpload: File, idImage: string): AngularFireUploadTask {
    return this.storage.upload('ImgProfile/' + idImage, imgToUpload);
  }

  deleteUserPhoto(idUserPhoto: string): Observable<any> {
    return this.storage.ref('ImgProfile/' + idUserPhoto).delete();
  }

  getStringRank(userRank: UserRank): string {
    let rank:string = 'BingoNewbie'
    if(userRank = UserRank.BingoTester){
      rank = 'BingoTester'
    }
    else if(userRank = UserRank.BingoVeteran){
      rank = 'BingoVeteran'
    }
    else if(userRank = UserRank.BingoMaster){
      rank = 'BingoMaster'
    }
    else if(userRank = UserRank.UserAdmin){
      rank = 'UserAdmin'
    }
    return rank
  }

  updateFriendList(currentUserId:string, userList:string[]){
    return this.userCollection.doc<User>(currentUserId).update({
      friendsList:userList
    })
  }


}
