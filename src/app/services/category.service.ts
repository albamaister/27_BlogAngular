import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { Category } from '../models/category.model';


@Injectable()
export class CategoryService {

    public url: string;

    // tslint:disable-next-line: variable-name
    constructor( public _http: HttpClient ) {
        this.url = global.url;
    }


    create( token, category ):Observable<any> {
        let json = JSON.stringify(category);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.post(this.url + 'category', params, { headers });
    }

    getCategories(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'category', {headers});
    }

    getCategory(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'category/' + id, {headers});
    }

    getCategoryPost(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'post/category/' + id, {headers});
    }



}
