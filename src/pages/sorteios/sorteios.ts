import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from "ionic-angular";
import {CustomHttp} from "../../services/customHttp";
import {Request, RequestMethod} from "@angular/http";

@Component({
  selector: 'sorteios-page',
  templateUrl: 'sorteios.html'
})
export class SorteiosPage {
  private sorteios: Array<any>;
  private loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private customHttp:CustomHttp, public loadingCtrl: LoadingController) {
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
    });
  }
}
