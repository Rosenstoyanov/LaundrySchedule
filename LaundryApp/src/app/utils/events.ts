import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class Events {

    public static doLoggedIn: EventEmitter<any> = new EventEmitter<any>();

}