import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CreatePage } from '../pages/create/create'
import { ListPage } from '../pages/list/list';
import {LoginPage} from "../pages/login/login";
import { FaqPage } from "../pages/faq/faq";
import {Storage} from "@ionic/storage"
import {AuthService} from "../services/authService"
import {SorteiosPage} from "../pages/sorteios/sorteios";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  balance: any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, private storage: Storage,
              private authService: AuthService) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Sorteios', component: SorteiosPage },
      { title: 'Minhas Denúncias', component: ListPage },
      { title: 'Criar Denúncia', component: CreatePage },
      { title: 'Perguntas Frequentes', component: FaqPage },
      { title: 'Home', component: HomePage }
    ];

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#5f2f9e');

    this.storage.get('authorization').then((val) => {
      if(val !== null && val !== undefined) {
        this.nav.setRoot(HomePage);
        this.storage.get('login').then(value => {
          this.authService.setCPF(value);
          this.authService.setToken(val);
        })
      }
      let req = new Request({
        url: 'http://hackathonapi.sefaz.al.gov.br/sfz-nfcidada-api/api/public/consultarCredito/09326760000168',
        method: RequestMethod.Get
      });
      this.customHttp.request(req).subscribe((response) => {
        this.balance = JSON.parse(response.text()).valorCredito;
        console.log('aaaaaaa', this.balance);
      });
      this.initializeApp();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.storage.remove('authorization');
    this.nav.setRoot(LoginPage);
  }
}
