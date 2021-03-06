import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'basic';

  constructor(
    public wsService: WebsocketService,
    public chatService: ChatService
  ) {

  }
  ngOnInit( ) {
    this.chatService.getPrivateMessages().subscribe(msg => {
      console.log(msg);
    });
  }
}
