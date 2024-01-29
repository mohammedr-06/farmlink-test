import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class HttpInterceptorEventsService {
  request = new Subject();
  response = new Subject();
}