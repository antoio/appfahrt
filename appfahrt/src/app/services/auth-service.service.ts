import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  public getCurrentUser() {
    return this.user;
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  createUserRegular(email, password) {
    console.log('Create User', email);
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/login']))
      .catch((err) => {
        console.log('Something went wrong:');
        console.log(err);
      });
  }
}
