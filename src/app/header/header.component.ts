import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  onClick() {
    this.userService.logout()
      .subscribe(
        (data: any) => {
          console.log('Logged out!');
          this.router.navigate(['/login']);
        }, (error) => alert(error.text)
      );
  }

  homeClick(){}

}
