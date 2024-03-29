import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { User } from 'src/app/class/user';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userCollection: AngularFirestoreCollection<User>;
  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    private ngZone: NgZone, // NgZone service to remove outside scope warning,
    private userService: UserService

  ) {
    this.userCollection = this.afs.collection<User>('users');
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {

      if (user) {
        const userJson: any = user.toJSON()
        localStorage.setItem('userToken', JSON.stringify(userJson.stsTokenManager.accessToken));
        localStorage.setItem('userTokenExpiresAt', JSON.stringify(userJson.stsTokenManager.expirationTime));
      }

      else {
        localStorage.setItem('userToken', '');
        localStorage.setItem('userTokenExpiresAt', '');
      }
    })
  }

  // Sign in with email/password Connexion
  signIn(email: string, password: string): Promise<boolean> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        return true
      }).catch(e => {
        window.alert("Email/Password association does not exist")
        return false
      })
  }


  // Sign up with email/password Inscription
  SignUp(user: User, password: string): Promise<void> {

    return this.afAuth.createUserWithEmailAndPassword(user.mail!, password!)

      .then((newUser) => {

        if (newUser) {
          user.uid = newUser.user!.uid
          this.userService.newUser(user);
          newUser.user!.sendEmailVerification();
          window.alert("Inscription réussie, un mail de vérification vient de vous être envoyé (verifiez vos spams)");
          this.router.navigate(['/logIn'])
        }

      }).catch((error) => {
        window.alert(error)
      })
  }


  getCurrentUser() {
    return this.afAuth.authState;
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) : Promise<void> {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Un mail vient de vous être envoyé, veuillez vérifier vos mails.");
        this.ngZone.run(() => {
          this.router.navigate(['connexion']);
        });
      }).catch((error) => {
        window.alert(error)
      })
  }



  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const userToken: string | null = localStorage.getItem('userToken');
    if (userToken) {
      const user = JSON.parse(userToken);
      return (user !== null && user.emailVerified !== false) ? true : false;
    }
    else {
      return false
    }
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any): Promise<void> {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        //this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Sign out
  SignOut() : Promise<void>{
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userTokenExpiresAt');
      window.location.reload();
    })
  }

}
