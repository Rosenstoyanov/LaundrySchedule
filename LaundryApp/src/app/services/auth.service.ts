import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { User } from '../models/user';
import { ResponseModel } from '../models/response.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    private loginUrl = 'http://localhost:3000/api/login';
    private registerUrl = 'http://localhost:3000/api/register';
    private requestOptions: RequestOptions;

    constructor(private http: Http, private router: Router) {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Accept', 'application/json');
        this.requestOptions = new RequestOptions({ headers: headers });
    }

    register(email: string, password: string): Observable<ResponseModel> {
        console.log('email: ' + email + ' password: ' + password)
        let userjson = JSON.stringify({ email: email, password: password });

        return this.http.post(this.registerUrl, userjson, this.requestOptions)
            .map((response: Response) => {
                console.log(response)
                return new ResponseModel(true, '');
            }).catch((error: any) => {
                console.log(error)
                return Observable.of(new ResponseModel(false, error.json().message))
            });
    }

    login(email: string, password: string): Observable<ResponseModel> {
        console.log('email: ' + email + ' password: ' + password)
        let userjson = JSON.stringify({ email: email, password: password });

        return this.http.post(this.loginUrl, userjson, this.requestOptions)
            .map((response: Response) => {
                console.log(response)
                let token = response.json() && response.json().token;
                console.log(token)
                if (token) {
                    localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));
                    return new ResponseModel(true, '');
                } else {
                    return new ResponseModel(false, 'Login failed');
                }
            }).catch((error: any) => {
                console.log(error)
                return Observable.of(new ResponseModel(false, error.json().message))
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login'])
    }

}
