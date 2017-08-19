import { Injectable } from '@angular/core';
import {Http, Request, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Storage} from "@ionic/storage"

@Injectable()
export class FaqService {
  faq = [
    {'question': "Pergunta 1", 'answer': "Resposta 1"},
    {'question': "Pergunta 2", 'answer': "Resposta 2"},
    {'question': "Pergunta 3", 'answer': "Resposta 3"},
    {'question': "Pergunta 4", 'answer': "Resposta 4"},
    {'question': "Pergunta 5", 'answer': "Resposta 5"},
    {'question': "Pergunta 6", 'answer': "Resposta 6"}
  ]
  constructor(private http: Http, private storage:Storage) {
    
  }

  request(): any {
    return this.faq;
  }
}
