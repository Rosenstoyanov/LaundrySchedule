import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { User } from '../models/user';

@Injectable()
export class ProfileService {
  private requestOptions: RequestOptions
  private loggedUserProfileUrl = 'http://localhost:3000/api/profile';

  constructor(private http: Http) {
    let loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    headers.append('Accept', 'application/json');
    headers.append('x-access-token', loggedUser.token);
    this.requestOptions = new RequestOptions({ headers: headers });
  }

  loggedUserProfile(): Observable<User> {

    return this.http.get(this.loggedUserProfileUrl, this.requestOptions)
      .map((response: Response) => {
        console.log(response)
        return response.json().user;
      }).catch((error: any) => {
        return Observable.of([])
      });
  }
}
