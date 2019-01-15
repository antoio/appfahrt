import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {first} from 'rxjs/operators';


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
      }, (error) => console.log('user', error)
    );
  }

  public getCurrentUser() {
    return this.user;
  }
  public userIsSigenedIn() {
    return this._firebaseAuth.authState.pipe(first());
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  createUserRegular(email, password) {
    console.log('Create User', email);
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  changeUserPassword(oldPassword, newPassword) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(this.userDetails.email, oldPassword).then((user) => {
      this._firebaseAuth.auth.currentUser.updatePassword(newPassword).then(() => {
        // console.log('password change success');
      }).catch((err) => {
        console.error('password change failed');
      });
    }).catch((err) => {
      console.error('user credential failed');
    });
  }
  deleteUser(password: string) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(this.userDetails.email, password).then((user) => {
      this._firebaseAuth.auth.currentUser.delete().then(() => {
        // console.log('user successfull deleted');
        this.router.navigate(['/login']);
      }).catch((err) => {
        console.error('password change failed');
      });
    }).catch((err) => {
      console.error('user credential failed');
    });
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
