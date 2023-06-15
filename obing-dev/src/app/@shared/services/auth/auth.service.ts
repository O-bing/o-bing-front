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
        console.log("user found", user)
        localStorage.setItem('user', JSON.stringify(user));
        //JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', '');
        console.log("user NOT found")
        //JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password Connexion
  signIn(email:string, password:string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          //this.router.navigate(['accueil']);
          console.log(result)
        });
      }).catch((error) => {
        window.alert(error.message)
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
        window.alert("Un mail vien d'être envoyé, vérifiez vos mail");
        this.ngZone.run(() => {
          this.router.navigate(['connexion']);
        });
      }).catch((error) => {
        window.alert(error)
      })
  }



  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const userStorage : string | null = localStorage.getItem('user');
    if (userStorage){
      const user = JSON.parse(userStorage);
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
      this.router.navigate(['home']);
    })
  }

}
