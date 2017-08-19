import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { MenuController } from 'ionic-angular';
import { CustomHttp } from '../../services/customHttp';
import {Request, RequestMethod} from '@angular/http';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  reports: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private menuController: MenuController, private customHttp: CustomHttp) {
    console.log(this.menuController)
    this.menuController.enable(true);
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    let value = {}
    let req = new Request({
      url: 'http://hackathonapi.sefaz.al.gov.br/sfz-nfcidada-api/api/public/denuncia',
      method: RequestMethod.Post,
      body: JSON.stringify(value)
    });
    this.customHttp.request(req).subscribe((response) => {
      let res = JSON.parse(response.text());
      this.reports = res;
    });
  }

  newReport() {
    let navOptions = {
      animate: true,
      animation: 'md-trasition',
      direction: 'foward'
    }
    this.navCtrl.push(CreatePage, {}, navOptions);
  }
}
