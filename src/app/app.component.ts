import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CreatePage } from '../pages/create/create'
import { ListPage } from '../pages/list/list';
import {LoginPage} from "../pages/login/login";
import {Storage} from "@ionic/storage"
import {AuthService} from "../services/authService"

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, private storage: Storage,
              private authService: AuthService) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Minhas Denúncias', component: ListPage },
      { title: 'Criar Denúncia', component: CreatePage }
    ];

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#5F2F9R');

    this.storage.get('authorization').then((val) => {
      if(val !== null && val !== undefined) {
        this.nav.setRoot(ListPage);
        this.authService.saveCPF();
        this.authService.setToken(val);
      }
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
