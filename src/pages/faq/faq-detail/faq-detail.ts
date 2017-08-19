import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'faq-detail-page',
  templateUrl: 'faq-detail.html'
})
export class FaqDetailPage {
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
