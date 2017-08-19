import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Request, RequestMethod} from '@angular/http';

@Component({
    selector: 'page-faq',
    templateUrl: 'faq.html'
})

export class FaqPage {
    questions: Array<{question: string, ask: string}>;

    constructor(public navController: NavController, public navParams: NavParams){

    }

}