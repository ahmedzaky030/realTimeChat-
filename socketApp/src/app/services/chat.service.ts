import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messageChat = this.socket.fromEvent<any>('message');
  id = this.socket.fromEvent<any>('getId').pipe(first());
  constructor(public socket: Socket , private http: HttpClient) { }

  sendMessage(message: string , id: string){
    this.socket.connect();
    this.socket.emit('message', { message: message , sender:id})
  }

  getMessages(){
    return this.http.get('http://localhost:4444/chat' , {})
  }
}
