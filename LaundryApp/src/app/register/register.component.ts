import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'
import { ResponseModel } from '../models/response.model';
import { Auth } from '../models/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new Auth('', '');
  registerFailed = false;
  error = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  doRegister() {
    this.authService.register(this.user.email, this.user.password).subscribe((responseModel: ResponseModel) => {
      console.log("modelStatus: " + responseModel.isSuccess + " message: " + responseModel.message);
      if (responseModel.isSuccess) {
        this.router.navigate(['/login']);
        // Events.onUserLogged.emit();
      } else {
        this.registerFailed = true;
        this.error = responseModel.message;
      }
    });
  }

}
