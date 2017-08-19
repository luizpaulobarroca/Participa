import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FaqService } from "../../services/faqService";
import { FaqDetailPage } from "./faq-detail/faq-detail";

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})

export class FaqPage {

  questions: Array<{question: string, answer: string}>;

  constructor( public navController: NavController, public navParams: NavParams, public faqService: FaqService){
    this.questions = this.faqService.request();
  }

  viewDetail(index){
    console.log(index);
    //this.navCtrl.animation('foward');
    var navOptions = {
      animate: true,
      animation: 'md-trasition',
      direction: 'foward'
    }

    this.navController.push(FaqDetailPage, this.questions[index], navOptions);
  }

  getItems(ev: any) {

    this.questions = this.faqService.request();

    // Reset items back to all of the items
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.questions = this.questions.filter((item) => {
        return (item.question.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }



}
