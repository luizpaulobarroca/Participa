import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { MenuController } from 'ionic-angular';
import { CustomHttp } from '../../services/customHttp';
import {Request, RequestMethod} from '@angular/http';
import {AuthService} from "../../services/authService"
import { ListDetailPage } from "./list-detail/list-detail";

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
              private authService: AuthService) {
    this.menuController.enable(true);
    // If we navigated to this page, we will have an item available as a nav param
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
    });
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
