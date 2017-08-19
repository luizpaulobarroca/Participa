import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Storage } from '@ionic/storage';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import { Device } from "@ionic-native/device";
import { AlertController } from 'ionic-angular';
import {ListPage} from "../list/list";
import { MenuController } from 'ionic-angular';
import {AuthService} from "../../services/authService"

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
              private formBuilder: FormBuilder, private device: Device, private storage:Storage,
              private alertCtrl: AlertController, private menuController: MenuController,
              private authService: AuthService) {
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
      this.authService.login(this.login, this.idAutorizacao).subscribe((response: Response) => {
        let res = JSON.parse(response.text());
        this.storage.set('authorization', res.id_token);
        this.navCtrl.setRoot(ListPage)
      }, (err) => {
        let res = JSON.parse(err.text());
        if(res.codigo === '1') {
          this.warningAlert(res.mensagem);
        } else {
          this.requestId();
        }
      });
    } else {
      this.requestId();
    }
  }

  requestId () {
    this.authService.request(this.report.value.cpf, this.device.uuid).subscribe((response: Response) => {
      let res = JSON.parse(response.text());
      this.storage.set('idAutorizacao', res.idAutorizacao);
      this.storage.set('login', this.report.value.cpf);
      this.authService.setCPF(this.report.value.cpf);
      this.login = this.report.value.cpf;
      this.idAutorizacao = res.idAutorizacao;
      this.presentAlert('<a href=' + res.urlAutorizacao + '>Aqui!</a>');
    }, (err) => {
      console.log(err)
    });
  }
}
