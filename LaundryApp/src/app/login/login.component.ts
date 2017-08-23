import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'
import { ResponseModel } from '../models/response.model';
import { Auth } from '../models/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new Auth('', '');
  loginFailed = false;
  error = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    this.authService.login(this.user.email, this.user.password)
      .subscribe((responseModel: ResponseModel) => {
        console.log("modelStatus: " + responseModel.isSuccess + " message: " + responseModel.message);
        if (responseModel.isSuccess) {
          this.router.navigate(['/home']);
          // Events.onUserLogged.emit();
        } else {
          this.loginFailed = true;
          this.error = responseModel.message;
        }
      });
  }

}
