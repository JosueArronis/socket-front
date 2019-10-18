import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: string;
  constructor(
    protected wsService: WebsocketService,
    private router: Router
  ) {
    this.userName = '';
   }

  ngOnInit() {
  }

  login() {
    this.wsService.loginWS(this.userName).then(() => {
      this.router.navigate(['chat']);
    });

  }

}
