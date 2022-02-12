import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getAuth } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  public async signUp(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(
        response => {
          return resolve(response);
        },
        error => {
          return reject(error);
        }
      );
    });
  }
  public async signIn(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(email, password).then(
        response => {
          return resolve(response);
        },
        error => {
          return reject(error);
        }
      );
    });
  }
  public async signOut(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signOut().then(
        response => {
          return resolve(response);
        },
        error => {
          return reject(error);
        }
      );
    });
  }

  public getAuthentication(){
    return getAuth();
  }
}