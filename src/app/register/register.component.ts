import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = "";
  password = "";
  cpassword = "";
  address = "";

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.address = window.location.href.split(":")[1];
    this.address = this.address.substring(2);
  }

  register() {
    if(this.password !== this.cpassword) {
      alert('Passwords do not match!');
    }
    else {
      this.userService.register(this.username, this.password, this.address)
      .subscribe(
        (data: any) => {
          console.log('Registered!');
          this.router.navigate(['/login']);
        }, (error) => alert(error.text)
      );
    }
  }

  back() {
    this.router.navigate(['/login']);
  }
}
