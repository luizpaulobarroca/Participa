import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SemNotaPage} from "../semNota/semNota"
import {Request, RequestMethod} from "@angular/http";
import {CustomHttp} from "../../services/customHttp";
import {AuthService} from "../../services/authService";
import {ListPage} from "../list/list";

@Component({
  selector: 'create-page',
  templateUrl: 'create.html'
})
export class CreatePage {
  private report : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private customHttp: CustomHttp,
              private authService: AuthService) {
    this.report = this.formBuilder.group({
      dataEmissao: ['', Validators.required],
      denuncia: ['', Validators.required],
      tipoDenuncia: ['', Validators.required]
    });
  }

  logForm() {
    let navOptions = {
      animate: true,
      animation: 'md-trasition',
      direction: 'foward'
    }

    let values = this.report.value;
    var data = values.dataEmissao.split('-');
    data = data[2] + '/' + data[1] + '/' + data[0];
    values.dataEmissao = data;
    values.cpfCnpjDenunciante = this.authService.getCPF();
    console.log(values.cpfCnpjDenunciante);
    if(values.tipoDenuncia == '1') {
      this.navCtrl.push(SemNotaPage, values, navOptions);
    } else {
      this.createReport(values)
    }
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
