import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from "ionic-angular";
import {CustomHttp} from "../../services/customHttp";
import {Request, RequestMethod} from "@angular/http";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";

@Component({
  selector: 'sorteios-page',
  templateUrl: 'sorteios.html'
})
export class SorteiosPage {
  private sorteios: Array<any>;
  private loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private customHttp:CustomHttp, public loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });
    this.loading.present();
    let req = new Request({
      url: 'http://hackathonapi.sefaz.al.gov.br/sfz-nfcidada-api/api/public/sorteio',
      method: RequestMethod.Get
    });
    this.customHttp.request(req).subscribe((response) => {
      this.sorteios = JSON.parse(response.text());
      this.loading.dismissAll();
    }, (err) => {
      this.loading.dismissAll();
      if(err.status === 500) {
        this.errorAlert();
      } else if(err.status === 403) {
        this.navCtrl.setRoot(LoginPage);
      }
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
          this.navCtrl.setRoot(HomePage)
        }
      }]
    });
    alert.present();
  }

}
