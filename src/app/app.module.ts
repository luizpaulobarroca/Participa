import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { CustomHttp } from "../services/customHttp";
import { FaqService } from "../services/faqService";
import { HttpModule } from '@angular/http';
import { Device } from "@ionic-native/device"
import { AuthService } from "../services/authService"
import { Camera } from '@ionic-native/camera';
import { BackgroundGeolocation } from "@ionic-native/background-geolocation"
import {DatePicker } from "@ionic-native/date-picker"
import {Geolocation} from "@ionic-native/geolocation"

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ListDetailPage } from '../pages/list/list-detail/list-detail';
import { CreatePage } from '../pages/create/create';
import {SemNotaPage} from "../pages/semNota/semNota";
import {LoginPage} from "../pages/login/login";
import { FaqPage } from "../pages/faq/faq";
import { FaqDetailPage } from  "../pages/faq/faq-detail/faq-detail";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ListDetailPage,
    CreatePage,
    SemNotaPage,
    LoginPage,
    FaqPage,
    FaqDetailPage
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
    ListDetailPage,
    CreatePage,
    SemNotaPage,
    LoginPage,
    FaqPage,
    FaqDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CustomHttp,
    Device,
    AuthService,
    FaqService,
    Camera,
    BackgroundGeolocation,
    DatePicker,
    Geolocation
  ]
})
export class AppModule {}
