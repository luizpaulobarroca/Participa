import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'sem-nota-page',
  templateUrl: 'semNota.html'
})
export class SemNotaPage {
  private report : FormGroup;
  private values = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.values = this.navParams.data;
    this.report = this.formBuilder.group({
      cNF: ['', Validators.required],
      valor: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      serie: ['', Validators.required],
      subserie: ['', Validators.required],
      cnpjEmitente: ['', Validators.required],
      numeroECF: ['', Validators.required],
    });
  }

  logForm() {
    console.log('aaaaaaaaa');
  }
}
