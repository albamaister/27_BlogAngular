import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { Post } from '../models/post.model';


@Injectable()
export class PostService {

    public url: string;

    // tslint:disable-next-line: variable-name
    constructor( public _http: HttpClient ) {
        this.url = global.url;
    }

    create( token, post ): Observable<any> {
        post.content = global.htmlEntities(post.content); // Limpiar campo content
        let json = JSON.stringify(post);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.post(this.url + 'post', params, { headers });

    }

    getPosts(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'post', { headers });
    }

    getPost(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'post/' + id, { headers });
    }

    update( token, post, id ): Observable<any> {
        post.content = global.htmlEntities(post.content); // Limpiar campo content
        let json = JSON.stringify(post);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'post/' + id, params, { headers });
    }

    delete( token, id ) {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);
        return this._http.delete(this.url + 'post/' + id, { headers });
    }

}
