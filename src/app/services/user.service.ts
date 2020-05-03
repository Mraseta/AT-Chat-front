import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  address = "";

  login(username: string, password: string, address: string) {
    this.address = address;
    return this.http.post("http://"+this.address+":8080/ChatWAR/rest/users/login", {
      username: username,
      password: password
    })
      .pipe(
        map((res: any) => {
          const data = res;
          localStorage.setItem('loggedUser', JSON.stringify(data));
          return data;
        }),
        catchError((err: any) => {
          console.log(err)
          return throwError(err)
        })
      )
  }

  register(username: string, password: string, address: string) {
    this.address = address;
    return this.http.post("http://"+this.address+":8080/ChatWAR/rest/users/register", {
      username: username,
      password: password
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

  getRegistered() {
    this.address = JSON.parse(localStorage.getItem('loggedUser')).host.address;
    return this.http.get("http://"+this.address+":8080/ChatWAR/rest/users/registered")
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

  getOnline() {
    this.address = JSON.parse(localStorage.getItem('loggedUser')).host.address;
    return this.http.get("http://"+this.address+":8080/ChatWAR/rest/users/loggedIn")
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

  logout() {
    this.address = JSON.parse(localStorage.getItem('loggedUser')).host.address;
    return this.http.delete("http://"+this.address+":8080/ChatWAR/rest/users/loggedIn/" + JSON.parse(localStorage.getItem('loggedUser')).username)
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
