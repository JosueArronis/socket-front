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
      from: 'Josue',
      body: message
    };
    this.wsService.socketEmit('message', payload);
  }

  getMessage() {
   return this.wsService.socketListen('new-message');
  }
}
