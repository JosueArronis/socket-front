import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  constructor(
    private socket: Socket
  ) {
    this.checkServerStatus();
  }

  checkServerStatus() {
    this.socket.on('connect', () => {
      console.log('Server connected');
      this.socketStatus = true;
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
}
