import { Injectable } from '@angular/core';
import { User} from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/';

@Injectable( {
  providedIn: 'root',
})

export class AuthService {
  userData: any; // save logged in user data
  // user$: Observable<User>;

  constructor(
    public angfires: AngularFirestore, // Inject Firestore service
    public angfireAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
  ) { 

     // Get auth data, then get firestore user document || null

    //  this.user$= this.angfireAuth.authState;
    //  this.user$.pipe(switchMap(user => {
    //    if (user) {
    //      return this.angfires.doc<User>(`users/${user.uid}`).valueChanges()
    //    } else {
    //      return of(null)
    //    }
    //  }))

    this.angfireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

  }
// Sign In 

SignIn(email: string, password: string) {
  return this.angfireAuth.signInWithEmailAndPassword(email, password)
.then((result) => {
  this.SetUserData(result.user);
  this.angfireAuth.authState.subscribe((user) => {
    if(user) {
      this.router.navigate(['dashboard']);
    }
  });
}) 
. catch((error) =>{
  window.alert(error.message);
} );
}

// Sign Up

SignUp(email:string , password:string) {
  return this.angfireAuth.createUserWithEmailAndPassword(email, password)
  .then((result) => {
    this.SendVerificationMail();
    this.SetUserData(result.user);
  })
  .catch((error) => {
  window.alert(error.message);
  });
}

// Email verification

SendVerificationMail() {
  return this.angfireAuth.currentUser
    .then((u: any) => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email-address']);
    });
}

 // Reset Forgot password
 ForgotPassword(passwordResetEmail: string) {
  return this.angfireAuth
    .sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    })
    .catch((error) => {
      window.alert(error);
    });
}

  //* Setting up user data when sign in with username/password, sign up with username/password and sign in with social auth  

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.angfires.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
     
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

 // Returns true when user is looged in and email is verified

 get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user')!);
  return (user !== null && user.emailVerified !== false )? true : false;
}

 // Sign out
 SignOut() {
  return this.angfireAuth.signOut().then(() => {
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  });
}



}


