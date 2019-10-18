import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate{

  constructor(
    public wbServices: WebsocketService,
    private router: Router
  ) { }

  canActivate() {
    if (this.wbServices.getUser()) {
      return true;
    } else  {
      this.router.navigate(['/'])
      return false;
    }
  }
}
