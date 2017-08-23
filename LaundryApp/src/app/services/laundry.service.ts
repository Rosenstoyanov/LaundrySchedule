import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Laundry } from '../models/laundry';
import { ResponseModel } from '../models/response.model';



@Injectable()
export class LaundryService {

  private headers: Headers;

  private laundryUrl = 'http://localhost:3000/api/laundries';
  private bookLaundryUrl = 'http://localhost:3000/api/bookLaundry';

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    this.headers.append('Accept', 'application/json');

  }

  layndries(token: string): Observable<Laundry[]> {
    this.headers.delete('x-access-token');
    this.headers.append('x-access-token', token);
    let requestOptions = new RequestOptions({ headers: this.headers });

    return this.http.get(this.laundryUrl, requestOptions)
      .map((response: Response) => {
        console.log(response)
        return response.json().laundries;
      }).catch((error: any) => {
        return Observable.of([])
      });
  }

  bookLaundry(token: string, laundryId: String): Observable<ResponseModel> {
    this.headers.delete('x-access-token');    
    this.headers.append('x-access-token', token);
    let requestOptions = new RequestOptions({ headers: this.headers });

    return this.http.post(this.bookLaundryUrl,
      JSON.stringify({ laundryId: laundryId }), requestOptions)
      .map((response: Response) => {
        console.log(response)
        return new ResponseModel(true, response.json().message);
      }).catch((error: any) => {
        return Observable.of(new ResponseModel(false, error.json().message))
      });
  }

}
