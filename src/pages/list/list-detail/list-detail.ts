import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'list-detail-page',
  templateUrl: 'list-detail.html'
})
export class ListDetailPage {
  question: {
    question: string,
    answer: string
  }


  constructor( private navParams: NavParams ) {
    this.question = {
      question: this.navParams.get('question'),
      answer: this.navParams.get('answer')
    }
  }
}
