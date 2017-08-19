import { Injectable } from '@angular/core';
import {Http, Request, RequestOptionsArgs, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service'

@Injectable()
export class CustomHttp {

  constructor(private http: Http) { }

  request(req: Request): Observable<Response> {
    let token = localStorage.getItem('authorization');
    if (token) {
      req.headers.set('Authorization', token);
    }
    return this.http.request(req);
  }