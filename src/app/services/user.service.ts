import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { global } from './global';

@Injectable()
export class UserService {

    public url: string;
    public identity;
    public token;

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

    update( token, user ): Observable<any>  {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.put(this.url + 'user/update', params, { headers });
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity && identity !== 'undefine') {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {

        let token = localStorage.getItem('token');

        if (token && token !== 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;

    }

}




