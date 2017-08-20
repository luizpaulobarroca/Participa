import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SemNotaPage} from "../semNota/semNota"
import {Request, RequestMethod} from "@angular/http";
import {CustomHttp} from "../../services/customHttp";
import {AuthService} from "../../services/authService";
import {ListPage} from "../list/list";
import {Camera,CameraOptions} from "@ionic-native/camera";
import {Geolocation} from "@ionic-native/geolocation";
import {DatePicker} from "@ionic-native/date-picker";
import {LoginPage} from "../login/login";


@Component({
  selector: 'create-page',
  templateUrl: 'create.html'
})
export class CreatePage {
  private report : FormGroup;
  private base64Image: string;
  private lat:number;
  private lng:number;
  private watch:any;
  private loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private customHttp: CustomHttp,
              private authService: AuthService, private camera:Camera,
              private datePicker: DatePicker, private geolocation: Geolocation,
              public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.report = this.formBuilder.group({
      dataEmissao: ['', Validators.required],
      denuncia: ['', Validators.required],
      tipoDenuncia: ['', Validators.required]
    });
    this.watch = this.geolocation.watchPosition();
    this.watch.subscribe((data) => {
      if(data.coords) {
        this.lat = data.coords.latitude;
        this.lng = data.coords.longitude;
      }
    });

  }

  showDatePicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.report.controls['dataEmissao'].setValue(this.formatDate(date));
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  formatDate(date) {
    var d = date,
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  logForm() {
    let navOptions = {
      animate: true,
      animation: 'md-trasition',
      direction: 'foward'
    };
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    let values = this.report.value;
    var data = values.dataEmissao.split('-');
    data = data[2] + '/' + data[1] + '/' + data[0];
    values.dataEmissao = data;
    values.image = this.base64Image;
    values.cpfCnpjDenunciante = this.authService.getCPF();
    values.location = {
      latitude: this.lat,
      longitude: this.lng
    };
    if(values.tipoDenuncia == '1') {
      this.navCtrl.push(SemNotaPage, values, navOptions);
    } else {
      this.createReport(values)
    }
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

  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: 'Denúncia criada com sucesso.',
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
    this.loading.present();
    let value = values;
    value.cNF = '000';
    let req = new Request({
      method: RequestMethod.Post,
      url: 'http://hackathonapi.sefaz.al.gov.br/sfz-nfcidada-api/api/public/denuncia/incluir',
      body: JSON.stringify(value)
    });
    req.headers.set('content-type', 'application/json');
    this.customHttp.request(req).subscribe((response) => {
      this.loading.dismissAll();
      this.successAlert();
    }, (err) => {
      this.loading.dismissAll();
      if(err.status === 500) {
        this.errorAlert();
      } else if(err.status === 403) {
        this.navCtrl.setRoot(LoginPage);
      }
      console.log(err);
    });
  }
}
