import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  constructor(private http: Http, private router: Router) { }

   logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login'])
    }

}
