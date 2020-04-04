import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  myId = '1';
  message = '';
  messages = [
    {sender: '1' , message: 'Hello' },
    {sender: '2' , message: 'Hello from there' } ]
  constructor(private chatService: ChatService ) { }

  ngOnInit() {
    this.chatService.messageChat.subscribe(data => {
      console.log(data);
      this.messages = [...[data], ...this.messages];
    })

    this.chatService.socket.connect();
    this.chatService.id.subscribe(data => {
      console.log(data);
      this.myId = data.id;
    })

    this.chatService.getMessages().subscribe(data => {
      console.log('get messages', data)
      this.chatService.socket.connect();
    })
  }

  

  SendMessage(){
    this.chatService.sendMessage(this.message , this.myId);
    this.message = '';
  }

}
