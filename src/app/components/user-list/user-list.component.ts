import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  activeUserObs: Observable<any>;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {
    this.activeUserObs =  this.chatService.getActiveUser();
    this.chatService.emmitUsersActives();

  }

}
