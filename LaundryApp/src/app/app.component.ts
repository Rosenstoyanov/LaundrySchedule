import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Events } from './utils/events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private loggedUser: Boolean

  constructor(private authService: AuthService) {
    this.loggedUser = localStorage.getItem('currentUser') ? true : false
    Events.doLoggedIn.subscribe(data => {
      this.loggedUser = true;
    });
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
