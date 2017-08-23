import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private userLoggedin: boolean
  private userEmail: string

  constructor() { 
    let loggedUser = JSON.parse(localStorage.getItem('currentUser'))
    this.userLoggedin = loggedUser ? true : false

    if(this.userLoggedin){
      this.userEmail = loggedUser.email
    }

  }

  ngOnInit() {
  }

}
