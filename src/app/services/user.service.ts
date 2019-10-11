import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    // tslint:disable-next-line: variable-name
    constructor( public _http: HttpClient ) {}

    test() {
        return 'Hola mundo desde un servicio';
    }

}




