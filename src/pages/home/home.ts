import { Component } from '@angular/core';
import {LoadingController, MenuController, NavController} from 'ionic-angular';
import {CustomHttp} from "../../services/customHttp";
import {Request, RequestMethod} from "@angular/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private balance: number;
  private notas: any;
  private loading: any;
  constructor(public navCtrl: NavController, private customHttp: CustomHttp,
              private menuController: MenuController, public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });
    this.loading.present();
    this.menuController.enable(true);
    let req = new Request({
      url: 'http://hackathonapi.sefaz.al.gov.br/sfz-nfcidada-api/api/public/consultarCredito/09326760000168',
      method: RequestMethod.Get
    });
    this.customHttp.request(req).subscribe((response) => {
      this.balance = JSON.parse(response.text()).valorCredito;
    });
    let value = {
      dataCompetencia: '201603',
      numeroDestinatario: '72544996404'
    };
    let req2 = new Request({
      url: 'http://hackathonapi.sefaz.al.gov.br/sfz-nfcidada-api/api/public/notas',
      method: RequestMethod.Post,
      body: JSON.stringify(value)
    });
    req2.headers.set('content-type', 'application/json');
    this.customHttp.request(req2).subscribe((response) => {
      this.notas = JSON.parse(response.text());
      this.loading.dismissAll();
    });
  }

}
