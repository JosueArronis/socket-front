import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMessage(message: string) {
    const payload = {
      from: this.wsService.getUser().name,
      body: message
    };
    this.wsService.socketEmit('message', payload);
  }

  getMessage() {
   return this.wsService.socketListen('new-message');
  }

  getPrivateMessages() {
    return this.wsService.socketListen('private-message');
  }
}
