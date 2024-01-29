import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';

@Injectable({
  providedIn: 'root',
})
export class RxStompService extends RxStomp {
  subscribe(arg0: string, arg1: (message: import("@stomp/stompjs").IMessage) => void) {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super();
  }
}
