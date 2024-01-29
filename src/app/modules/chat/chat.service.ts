import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  API_URL = environment.apiURL;
  channelData: any;
  constructor(private http: HttpClient) { }
  public getChatroom(receiverID) {
    const url = this.API_URL+"/rooms/ensure?receiverId="+receiverID;
    return this.http.post<any>(url, {});
  }
  public getUserMessage(userInfo) {
    const url = this.API_URL+"/messages?receiverId="+userInfo.receiverID+"&roomId="+userInfo.roomId;
    return this.http.get<any>(url);
  }
  public getUserList(farmerId){
    const url = this.API_URL+"/rooms/findUser?farmerId="+farmerId;
    return this.http.get<any>(url);
  }
}
