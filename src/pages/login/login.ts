import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Storage } from '@ionic/storage';
import { CustomHttp } from "../../services/customHttp"
import {Request, RequestMethod, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { Device } from "@ionic-native/device";
import { AlertController } from 'ionic-angular';
import {ListPage} from "../list/list";
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  private report : FormGroup;
  private values = {};
  private login:string;
  private idAutorizacao:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private customHttp: CustomHttp,
              private device: Device, private storage:Storage,
              private alertCtrl: AlertController, private menuController: MenuController) {
    this.values = this.navParams.data;
    this.menuController.enable(false);
    // console.log(this.menuController);
    this.report = this.formBuilder.group({
      cpf: ['', Validators.required]
    });
    this.storage.get('login').then((val) => {
      this.login = val;
    });
    this.storage.get('idAutorizacao').then((val) => {
      this.idAutorizacao = val;
    });
  }

  ionViewCanEnter() {
    this.storage.get('authorization').then((val) => {
      if(val !== null && val !== undefined) {
        this.navCtrl.setRoot(ListPage)
      }
    });
  }

  presentAlert(url: string) {
    let alert = this.alertCtrl.create({
      title: 'Autorizar',
      subTitle: 'Autorize o acesso ' + url,
      buttons: ['Ok']
    });
    alert.present();
  }

  warningAlert(text: string) {
    let alert = this.alertCtrl.create({
      // title: '',
      subTitle: text,
      buttons: ['Ok']
    });
    alert.present();
  }

  logForm() {
    if (this.login === this.report.value.cpf && this.idAutorizacao) {
      let value = {
        login: this.login,
        idAutorizacao: this.idAutorizacao,
        tokenApp: '45ddaa3ac1e0585c0528896d94464ae681662a87'
      };
      let request = new Request({
        url: 'http://hackathonapi.sefaz.al.gov.br/api/public/autenticar',
        method: RequestMethod.Post,
        body: JSON.stringify(value)
      });
      request.headers.set('Content-Type', 'application/json');
      this.customHttp.request(request).subscribe((response: Response) => {
        let res = JSON.parse(response.text());
        this.storage.set('authorization', res.id_token);
        this.navCtrl.setRoot(ListPage)
      }, (err) => {
        let res = JSON.parse(err.text());
        this.warningAlert(res.mensagem);
      });
    } else {
      let value = {
        login: this.report.value.cpf,
        tokenApp: '45ddaa3ac1e0585c0528896d94464ae681662a87',
        nomeDispositivo: this.device.uuid
      };
      let request = new Request({
        url: 'http://hackathonapi.sefaz.al.gov.br/sfz-habilitacao-aplicativo-api/api/public/autorizacao-aplicativo/solicitar',
        method: RequestMethod.Post,
        body: JSON.stringify(value)
      });
      request.headers.set('Content-Type', 'application/json');
      this.customHttp.request(request).subscribe((response: Response) => {
        let res = JSON.parse(response.text());
        this.storage.set('idAutorizacao', res.idAutorizacao);
        this.storage.set('login', value.login);
        this.login = value.login;
        this.idAutorizacao = res.idAutorizacao;
        this.presentAlert('<a href=' + res.urlAutorizacao + '>Aqui!</a>');
      }, (err) => {
        console.log(err)
      });
    }
  }
}
