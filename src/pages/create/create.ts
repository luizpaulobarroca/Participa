import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SemNotaPage} from "../semNota/semNota"

@Component({
  selector: 'create-page',
  templateUrl: 'create.html'
})
export class CreatePage {
  private report : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.report = this.formBuilder.group({
      dataEmissao: ['', Validators.required],
      denuncia: ['', Validators.required],
      tipoDenuncia: ['', Validators.required]
    });
  }

  logForm() {
    let navOptions = {
      animate: true,
      animation: 'md-trasition',
      direction: 'foward'
    }
    let values = this.report.value;
    if(values.tipoDenuncia == '1') {
      this.navCtrl.push(SemNotaPage, values, navOptions);
    } else {
      console.log('massa');
      // this.navCtrl.push(CreatePage, {}, navOptions);
    }
  }

  teste () {
    console.log(this.report.value.tipoDenuncia)
  }
}
