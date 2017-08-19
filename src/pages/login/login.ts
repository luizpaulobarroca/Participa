import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  private report : FormGroup;
  private values = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.values = this.navParams.data;
    this.report = this.formBuilder.group({
      cpf: ['', Validators.required]
    });
  }

  logForm() {
    console.log('aaaaaaaaa');
  }
}
