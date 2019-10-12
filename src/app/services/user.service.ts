import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { global } from './global';

@Injectable()
export class UserService {

    public url: string;

    // tslint:disable-next-line: variable-name
    constructor( public _http: HttpClient ) {
        this.url = global.url;
    }

    test() {
        return 'Hola mundo desde un servicio';
    }

    register(user: User): Observable<any> {

        let json = JSON.stringify(user);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'register', params, { headers });

    }

    signup( user, getToken = null): Observable<any> {
        if ( getToken != null ) {
            user.gettoken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'login', params, { headers });
    }

}




