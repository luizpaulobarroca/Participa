import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SemNotaPage} from "../semNota/semNota"
import {Request, RequestMethod} from "@angular/http";
import {CustomHttp} from "../../services/customHttp";
import {AuthService} from "../../services/authService";
import {ListPage} from "../list/list";
import {Camera,CameraOptions} from "@ionic-native/camera"
import {
  BackgroundGeolocation, BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from "@ionic-native/background-geolocation"

@Component({
  selector: 'create-page',
  templateUrl: 'create.html'
})
export class CreatePage {
  private report : FormGroup;
  private base64Image: string;
  private location: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private customHttp: CustomHttp,
              private authService: AuthService, private camera:Camera,
              private backgroundGeolocation: BackgroundGeolocation) {
    this.report = this.formBuilder.group({
      dataEmissao: ['', Validators.required],
      denuncia: ['', Validators.required],
      tipoDenuncia: ['', Validators.required]
    });

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: true, // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
        this.location = location;
        console.log(location);
      });

// start recording location
    this.backgroundGeolocation.start();

// If you wish to turn OFF background-tracking, call the #stop method.
  }

  logForm() {
    let navOptions = {
      animate: true,
      animation: 'md-trasition',
      direction: 'foward'
    };

    let values = this.report.value;
    var data = values.dataEmissao.split('-');
    data = data[2] + '/' + data[1] + '/' + data[0];
    values.dataEmissao = data;
    values.image = this.base64Image;
    values.cpfCnpjDenunciante = this.authService.getCPF();
    values.location = {
      accuracy: this.location.accuracy,
      latitude: this.location.latitude,
      longitude: this.location.longitu
    };
    this.backgroundGeolocation.stop();
    if(values.tipoDenuncia == '1') {
      this.navCtrl.push(SemNotaPage, values, navOptions);
    } else {
      this.createReport(values)
    }
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  createReport (values) {
    let value = values;
    value.cNF = '000';
    let req = new Request({
      method: RequestMethod.Post,
      url: 'http://hackathonapi.sefaz.al.gov.br/sfz-nfcidada-api/api/public/denuncia/incluir',
      body: JSON.stringify(value)
    });
    req.headers.set('content-type', 'application/json');
    this.customHttp.request(req).subscribe((response) => {
      this.navCtrl.setRoot(ListPage);
    }, (err) => {
      console.log(err);
    });
  }
}
