import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Request, RequestMethod} from "@angular/http";
import {ListPage} from "../list/list";
import {CustomHttp} from "../../services/customHttp";

@Component({
  selector: 'sem-nota-page',
  templateUrl: 'semNota.html'
})
export class SemNotaPage {
  private report : FormGroup;
  private values = {};
  private loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private customHttp:CustomHttp,
              public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
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
    this.loading.present();
    var values = this.report.value;
    var val = Object.assign(values, this.values);
    val.cNF = values.cNF;
    let req = new Request({
      method: RequestMethod.Post,
      url: 'http://hackathonapi.sefaz.al.gov.br/sfz-nfcidada-api/api/public/denuncia/incluir',
      body: JSON.stringify(val)
    });
    req.headers.set('content-type', 'application/json');
    this.customHttp.request(req).subscribe((response) => {
      this.navCtrl.setRoot(ListPage);
      this.loading.dismissAll();
    }, (err) => {
      this.loading.dismissAll();
      console.log(err);
    });
  }
}
