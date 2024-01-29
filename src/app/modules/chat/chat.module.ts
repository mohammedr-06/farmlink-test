import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { TemplateModule } from '../template/template.module';
import { FormsModule } from '@angular/forms';
import { RxStompService } from './rx-stomp.service';
import { rxStompServiceFactory } from './rx-stomp-service-factory';
@NgModule({
  declarations: [
    ChatRoomComponent,
    ChatListComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,   
    NgxSpinnerModule,
    TemplateModule,
    ChatRoutingModule
  ],
  providers: [
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
  ]
})
export class ChatModule { }
