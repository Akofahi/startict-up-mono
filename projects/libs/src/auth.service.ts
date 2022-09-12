import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData?: Observable<firebase.User | null> ;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }
   /* Sign in */
 SignIn(email: string, password: string) {
  return this.angularFireAuth
  .signInWithEmailAndPassword(email, password)
  .then(res => {
  console.log('You\'re in!');
  
  })
  .catch(err => {
  console.log('Something went wrong:',err.message);
  });
  }

  showState(){
    console.log(this.angularFireAuth.authState.subscribe(data => {
      if(data){
        console.log(data)
      }
      else{
        console.log('not auth');
        
      }
    }));
  }
  
  /* Sign out */
  SignOut() {
    this.angularFireAuth.authState
  this.angularFireAuth
  .signOut();
  console.log('went out');
  }
}
