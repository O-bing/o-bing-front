import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { User } from 'src/app/class/user';
import { RoutesServices } from '../../RouteServices';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userCollection: AngularFirestoreCollection<User>;
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning

  ) {
    this.userCollection = this.afs.collection<User>(RoutesServices.Users);
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {

      if (user) {
        const userJson:any = user.toJSON()
        localStorage.setItem('userToken', JSON.stringify(userJson.stsTokenManager.accessToken));
        localStorage.setItem('userTokenExpiresAt', JSON.stringify(userJson.stsTokenManager.expirationTime));
      }

      else{
        localStorage.setItem('userToken', '');
        localStorage.setItem('userTokenExpiresAt', '');
      }
    })
  }

  // Sign in with email/password Connexion
  signIn(email:string, password:string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
      }).catch((error) => {
        window.alert("Email/Password association does not exist")
      })
  }

/*
  // Sign up with email/password Inscription
  SignUp(u: User, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(u.mail, password)
      .then((result) => {
        //Call the SendVerificaitonMail() function when new user sign up and returns promise

        window.alert("Inscription réussie, un mail de vérification vient de vous être envoyé (verifiez vos spams)");
        this.usersService.newUser(u, result.user.uid);

        result.user.sendEmailVerification();

        //connexion automatique a prevoir
      }).catch((error) => {
        window.alert(error)
      })
  }
  
  */

  getCurrentUser() {
    return this.afAuth.authState;
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail:string) {
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
    const userToken : string | null = localStorage.getItem('userToken');
    if (userToken){
      const user = JSON.parse(userToken);
      return (user !== null && user.emailVerified !== false) ? true : false;
    }
    else{
      return false
    }
  }

  // Auth logic to run auth providers
  AuthLogin(provider:any) {
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
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      window.location.reload();
    })
  }

}
