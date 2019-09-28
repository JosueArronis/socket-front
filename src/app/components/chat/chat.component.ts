import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  messageText: string;
  messageSubscription: Subscription;
  messages: any[] = [];
  messagesBox: HTMLElement;

  constructor(
    protected chatService: ChatService
  ) {
  }

  ngOnInit() {
    this.messagesBox = document.getElementById('chat-messages');
    this.messageSubscription =  this.chatService.getMessage().subscribe(msg => {
        this.messages.push(msg);
        setTimeout(() => {
          this.messagesBox.scrollTop = this.messagesBox.scrollHeight;
        }, 50);
      });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  sentMessages() {
    if (this.messageText.trim().length === 0 ) {
      return;
    }
    this.chatService.sendMessage(this.messageText);
    this.messageText = '';
  }

}
