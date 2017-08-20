import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import { CreatePage } from '../create/create';
import { MenuController } from 'ionic-angular';
import { CustomHttp } from '../../services/customHttp';
import {Request, RequestMethod} from '@angular/http';
import {AuthService} from "../../services/authService"
import { ListDetailPage } from "./list-detail/list-detail";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  reports = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private menuController: MenuController, private customHttp: CustomHttp,
              private authService: AuthService, public loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
    this.menuController.enable(true);
    // If we navigated to this page, we will have an item available as a nav param
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.selectedItem = navParams.get('item');
    let value = {
      cpfCnpjDenunciante: this.authService.getCPF()
    };
    let req = new Request({
      url: 'http://hackathonapi.sefaz.al.gov.br/sfz-nfcidada-api/api/public/denuncia',
      method: RequestMethod.Post,
      body: JSON.stringify(value),
      withCredentials: true
    });
    req.headers.set('Content-Type', 'application/json');
    this.customHttp.request(req).subscribe((response) => {
      let res = JSON.parse(response.text());
      this.reports = res;
      loading.dismissAll();
    }, (err) => {
      loading.dismissAll();
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
          this.navCtrl.setRoot(ListPage)
        }
      }]
    });
    alert.present();
  }

  viewDetail(index){
    var navOptions = {
      animate: true,
      animation: 'md-trasition',
      direction: 'foward'
    }

    this.navCtrl.push(ListDetailPage, this.reports[index], navOptions);
  }

  newReport() {
    let navOptions = {
      animate: true,
      animation: 'md-trasition',
      direction: 'foward'
    };
    this.navCtrl.push(CreatePage, {}, navOptions);
  }
}
