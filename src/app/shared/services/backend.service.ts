import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, getDocs } from "firebase/firestore";
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private store: AngularFirestore) { }

  public async createData(obj: object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.store.collection("groups").add(obj).then(
        response => {
          return resolve(response);
        },
        error => {
          return reject(error);
        }
      );
    });
  }
  public async fetchData(): Promise<any> {
    const db = firebase.firestore();
    return new Promise<any>((resolve, reject) => {
      getDocs(collection(db, "groups")).then(
        response => {
          let groups:Array<any> = [];
          response.forEach((doc) => {
            let item =doc.data();
            item['identifier'] = doc.id;
            groups.push(item);
          });
          return resolve(groups);
        },
        error => {
          return reject(error);
        }
      );
    });
  }
  public async updateData(id: string, obj: object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.store.collection('groups').doc(id).update(obj).then(
        response => {
          return resolve(response);
        },
        error => {
          return reject(error);
        }
      );
    });
  }

  public async deleteData(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.store.collection('groups').doc(id).delete().then(
        response => {
          return resolve(response);
        },
        error => {
          return reject(error);
        }
      );
    });
  }
}
