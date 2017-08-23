import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedUser: Boolean

  constructor(private authService: AuthService) {
    this.loggedUser = localStorage.getItem('currentUser') ? true : false;
    console.log("islogged: " + this.loggedUser)
  }

  ngOnInit() {
    console.log("DoOnInitAppComponent")
  }

  logout() {
    this.loggedUser = false;
    this.authService.logout();
  }
}
