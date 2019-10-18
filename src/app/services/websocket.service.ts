import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public user: UserModel =  null;
  constructor(
    private socket: Socket,
    private router: Router
  ) {
    this.loadUserStorage();
    this.checkServerStatus();
  }

  checkServerStatus() {
    this.socket.on('connect', () => {
      console.log('Server connected');
      this.socketStatus = true;
      this.loadUserStorage();
    });
    this.socket.on('disconnect', () => {
      console.log('Server disconnected');
      this.socketStatus = false;
    });
  }

  socketEmit(event: string, payload?: any, callback?: Function ) {
    this.socket.emit(event, payload, callback);
  }

  socketListen(event: string) {
    return this.socket.fromEvent(event);
  }

  loginWS(userName: string) {
    return new Promise((resolve, rejec) => {
      this.socketEmit('user-configure', { userName }, (resp) => {
        this.user = new UserModel(userName);
        this.saveUserStorage();
        resolve();
      });
    });
  }

  loguotWS() {
    this.user =  null;
    localStorage.removeItem('user');
    const payload = {
      userName: 'No-Login-yet'
    };
    this.socketEmit('user-configure', payload, (resp) => {});
    this.router.navigate(['/']);
  }

  getUser() {
    return this.user;
  }
  saveUserStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }
  loadUserStorage() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loginWS(this.user.name);
    }
  }
}
