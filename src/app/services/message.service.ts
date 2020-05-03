import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  address = "";

  sendMessage(receiver: string, subject: string, content: string) {
    let url = "";
    this.address = JSON.parse(localStorage.getItem('loggedUser')).host.address;
    if(receiver === "All") {
      url = "http://"+this.address+":8080/ChatWAR/rest/messages/all";
    }
    else {
      url = "http://"+this.address+":8080/ChatWAR/rest/messages/user";
    }
    console.log(url);
    return this.http.post(url, {
      sender: JSON.parse(localStorage.getItem('loggedUser')).username,
      receiver: receiver,
      subject: subject,
      content: content
    })
      .pipe(
        map((res: any) => {
          const data = res;
          return data;
        }),
        catchError((err: any) => {
          console.log(err)
          return throwError(err)
        })
      )
  }

  getMessages() {
    this.address = JSON.parse(localStorage.getItem('loggedUser')).host.address;
    return this.http.get("http://"+this.address+":8080/ChatWAR/rest/messages/" + JSON.parse(localStorage.getItem('loggedUser')).username)
      .pipe(
        map((res: any) => {
          const data = res;
          return data;
        }),
        catchError((err: any) => {
          console.log(err)
          return throwError(err)
        })
      )
  }
}
