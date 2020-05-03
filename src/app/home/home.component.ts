import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message: string;
  messages = [];
  users = [];
  onlineUsers = [];
  selectedUser: string;
  messageSubject: string;
  messageContent: string;
  messagesLoaded = false;
  usersLoaded = false;
  onlineLoaded = false;
  host = "ws://192.168.0.24:8080/ChatWAR/ws/";
  socket: any;
  address = "";

  constructor(private messageService: MessageService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.address = this.router.url.split(":")[0];
    console.log(this.address);
    if (localStorage.getItem('loggedUser') == null || localStorage.getItem('loggedUser') === '') {
      this.router.navigate(['/login']);
    }
    var user = JSON.parse(localStorage.getItem('loggedUser'));
    this.host = "ws://" + user.host.address + ":8080/ChatWAR/ws/";
    this.getRegistered();
    this.getMessages();
    this.getOnline();
    this.host = this.host + JSON.parse(localStorage.getItem('loggedUser')).username;

    try {
      this.socket = new WebSocket(this.host);
      var self = this;
      //console.log('connect: Socket Status: '+ this.socket.readyState);

      this.socket.onopen = function () {
        //console.log('onopen: Socket Status: '+ this.socket.readyState+' (open)');
        //console.log('onopen: LogedUser: '+user+'');
      }

      this.socket.onmessage = function (msg) {
        console.log('onmessage: Received: ' + msg.data);
        self.getMessages();
        self.getOnline();
      }

      this.socket.onclose = function () {
        this.socket = null;
      }

    } catch (exception) {
      console.log('Error' + exception);
    }
  }

  /*onSubmit(form: NgForm) {
    this.messageService.sendMessage(this.message)
      .subscribe(
        (data: any) => {
          console.log('Sent message to the server.');
        }, (error) => alert(error.text)
      );
  }*/

  getRegistered() {
    this.userService.getRegistered()
      .subscribe(
        (data: any) => {
          console.log('Got registered.');
          this.users = Object.assign([], (data));
          this.usersLoaded = true;
        }, (error) => alert(error.text)
      );
  }

  getOnline() {
    this.userService.getOnline()
      .subscribe(
        (data: any) => {
          console.log('Got online.');
          this.onlineUsers = Object.assign([], (data));
          this.onlineLoaded = true;
        }, (error) => alert(error.text)
      );
  }

  getMessages() {
    this.messageService.getMessages()
      .subscribe(
        (data: any) => {
          console.log('Got messages.');
          this.messages = Object.assign([], (data));
          this.messagesLoaded = true;
        }, (error) => alert(error.text)
      );
  }

  onClick(e) {
    this.selectedUser = e.target.innerHTML;
    console.log(this.selectedUser);
  }

  send() {
    var online = false;
    var i;
    for(i=0;i<this.onlineUsers.length;i++) {
      if(this.onlineUsers[i].username === this.selectedUser) {
        online = true;
        break;
      }
    }

    if(online || this.selectedUser === 'All') {
      this.messageService.sendMessage(this.selectedUser, this.messageSubject, this.messageContent)
        .subscribe(
          (data: any) => {
            this.getRegistered();
            this.getMessages();
            this.getOnline();
          }, (error) => alert(error.text)
        );
    } else {
      alert("Messages can be send to online users only!");
    }
  }

}
