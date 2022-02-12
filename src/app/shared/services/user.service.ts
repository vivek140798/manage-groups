import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: any = null;
  constructor() { }

  setUserId(id:any) {
    this.userId = id;
  }

  getUserId() {
    return this.userId;
  }
}
