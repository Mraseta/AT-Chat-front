import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";
  address = "";

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.address = window.location.href.split(":")[1];
    this.address = this.address.substring(2);
    console.log(this.address);
  }

  login() {
    this.userService.login(this.username, this.password, this.address)
      .subscribe(
        (data: any) => {
          console.log('Logged in!');
          this.router.navigate(['/']);
        }, (error) => alert(error.text)
      );
  }

  register() {
    this.router.navigate(['/register']);
  }
}
