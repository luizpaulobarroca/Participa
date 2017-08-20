import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Request, RequestMethod} from "@angular/http";
import {ListPage} from "../list/list";
import {CustomHttp} from "../../services/customHttp";
import {LoginPage} from "../login/login";

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
              public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
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

  errorAlert() {
    let alert = this.alertCtrl.create({
      title: 'Erro no servidor;',
      // subTitle: text,
      buttons: [{
        text: 'Ok',
        role: 'ok',
        handler: () => {
          this.navCtrl.setRoot(ListPage)
        }
      }]
    });
    alert.present();
  }

  successAlert() {
    let alert = this.alertCtrl.create({
      subTitle: 'Denúncia efetuada.',
      buttons: [{
        text: 'Ok',
        role: 'ok',
        handler: () => {
          this.navCtrl.setRoot(ListPage)
        }
      }]
    });
    alert.present();
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
      this.loading.dismissAll();
      this.successAlert();
    }, (err) => {
      this.loading.dismissAll();
      if(err.status === 500) {
        this.errorAlert();
      } else if(err.status === 403) {
        this.navCtrl.setRoot(LoginPage);
      }
      console.log(err);
    });
  }
}
