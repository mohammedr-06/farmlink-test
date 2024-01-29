import { Component, OnDestroy, OnInit, ChangeDetectorRef, AfterContentChecked  } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChatService } from '../chat.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { RxStompService } from '../rx-stomp.service';
import { AuthService} from '../../auth/auth.service';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, AfterContentChecked , OnDestroy {
  searchText: any;
  chatRes: any;
  userInfo: any;
  userListRes = [];
  subject: any;
  currentChatUser: any;
  isLoading = true;
  isChatRoomReady = true;
  receivedMessages: string[] = [];
  // @ts-ignore, to suppress warning related to being undefined
  private topicSubscription: Subscription;
 // private chanelSubscription: Subscription;
  constructor(public router: Router, private spinner: NgxSpinnerService,  private cdr: ChangeDetectorRef,
    private chatService: ChatService, private rxStompService: RxStompService,private authService:AuthService) {
    this.userInfo = this.authService.getUserInfo();
    
  }
  ngOnInit() { 
   this.getUserList();
  }
  isEmptyObject(obj) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        return false;
      }
    }
    return true;
  }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
  UserClick(user) {
    this.currentChatUser = user;
    this.getMessageData();
  }
  getUserList() {
    this.isLoading = true;
    this.chatService.getUserList(this.userInfo.id).subscribe(res => {
      if (!this.isEmptyObject(res)) {
        this.userListRes = res;
        this.currentChatUser = res[0];
        this.getMessageData();
      }
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      console.log(err);
      console.error("catch", err);
    })
  }
appSubscribtion(){
  /*this.chanelSubscription = this.rxStompService
      .watch('/app/topic')
      .subscribe((message: Message) => {
        this.receivedMessages.push(message.body);
         console.log(message);
      }); */
}

  /*getChannerId(){
    this.spinner.show();
     this.chatService.getChatroom(this.receiverId).subscribe(res => {
      this.roomId = res.id;
      this.chatService.channelData = res;
      this.getMessageData();
      this.spinner.hide();
     console.log(res);
    }, err => {
     this.spinner.hide();
     console.log(err);
      console.error("catch", err);
    })
  } */
  getMessageData() {
    console.log(this.currentChatUser);
    if (this.currentChatUser['chatRoomId'] !== 0) {
      this.isChatRoomReady = false;
    //  this.appSubscribtion();
      this.chatRes = [];
      this.topicSubscription = this.rxStompService
      .watch('/topic/'+this.currentChatUser['chatRoomId'])
      .subscribe((message: Message) => {
      //  this.receivedMessages.push(JSON.parse(message.body));
        const msgData = JSON.parse(message.body);    
        console.log("Message received \n" );
        console.log(msgData);   
        const msg = {
          "id":msgData['id'],
          "text":msgData['text'],
          "date":msgData['date'],
          "senderId":msgData['senderId'],
          "senderName":msgData['senderName'],
          "receiverId":msgData['receiverId'],
          "roomId":msgData['roomId']
          }
         this.chatRes.push(msg);
           this.chatRes = this.removeDuplicates(this.chatRes, "date")
         
         var el =document.getElementById('scrollMe');
         el.scrollTop = (el?.scrollHeight + 400);
       //  e1.scrollMe.scrollHeight;
      });
      const userinfo = {
        "receiverID": this.currentChatUser['userId'],
        "roomId": this.currentChatUser['chatRoomId']
      }
      this.chatService.getUserMessage(userinfo).subscribe(res => {
        this.chatRes = res;
        this.isChatRoomReady = true;
      }, err => {
        this.isChatRoomReady = true;
        console.log(err);
        console.error("catch", err);
      })
    }
  }
  removeDuplicates(myArray, Prop) {
    return myArray.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[Prop]).indexOf(obj[Prop]) === pos;
    });
  }
  onSendMessage() {
    const token =  this.authService.getToken(); 
    var message ={};
    if(this.currentChatUser.groupChat)
    {
       message = {"receiverIds":[this.currentChatUser?.farmerData?.id, this.currentChatUser?.butcherData?.id, this.currentChatUser?.userData?.id],"text":this.searchText,"roomId":this.currentChatUser['chatRoomId'], "authorization": token};
  
      }else {
         message = {"receiverId":this.currentChatUser['userId'],"text":this.searchText,"roomId":this.currentChatUser['chatRoomId'], "authorization": token};
  
    }
     this.rxStompService.publish({destination: '/app/topic', body:JSON.stringify(message), headers:{"Authorization": `Bearer ${token}`,"content-type":"application/json"}})
   // this.rxStompService.publish({destination: '/app/topic',body:JSON.stringify(message),headers:{"Authorization": "Bearer "+ token,"content-type":"application/json"}});
  //  this.rxStompService.publish({destination: '/topic/'+this.currentChatUser['chatRoomId'],body:JSON.stringify(message),headers:{ "Authorization": "Bearer "+ token,"content-type":"application/json"}});
    this.searchText ='';
   }
  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
   // this.chanelSubscription.unsubscribe();
  }

}


