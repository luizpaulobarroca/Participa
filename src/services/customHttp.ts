import { Injectable } from '@angular/core';
import {Http, Request, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Storage} from "@ionic/storage"

@Injectable()
export class CustomHttp {
  token: any;
  constructor(private http: Http, private storage:Storage) {
    this.storage.get('authorization').then(val => {
      this.token = val;
    });
  }

  request(req: Request): Observable<Response> {
    if (this.token) {
      req.headers.set('Authorization','Bearer ' + this.token);
    }
    return this.http.request(req);
  }
}
