import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import {CustomHttp} from "../services/customHttp"
import { HttpModule } from '@angular/http';
import {Device} from "@ionic-native/device"
import {AuthService} from "../services/authService"
// import { AUTH_PROVIDERS } from 'ng2-bearer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CreatePage } from '../pages/create/create';
import {SemNotaPage} from "../pages/semNota/semNota";
import {LoginPage} from "../pages/login/login";
import { FaqPage } from "../pages/faq/faq";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CreatePage,
    SemNotaPage,
    LoginPage,
    FaqPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CreatePage,
    SemNotaPage,
    LoginPage,
    FaqPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CustomHttp,
    Device,
    AuthService
  ]
})
export class AppModule {}
