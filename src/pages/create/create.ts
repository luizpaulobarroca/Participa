import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'create-page',
  templateUrl: 'create.html'
})
export class CreatePage {
  private report : FormGroup;
  tiposDenuncias = [
    ['1', 'Faltou o CPF'],
    ['2', 'Faltou a nota']
  ];

  tiposNota = [
    ['01', 'Modelo 1'],
    ['02', 'Modelo 2'],
    ['ecf', 'Cupom fiscal'],
    ['56', 'Eletronica']
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.report = this.formBuilder.group({
      cNF: [''],
      cnpjEmitente: ['', Validators.required],
      dataEmissao: ['', Validators.required],
      denuncia: ['', Validators.required],
      numeroECF: ['', Validators.required],
      valor: ['', Validators.required],
      situacao: ['', Validators.required],
      tipoDenuncia: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
    });
  }

  logForm() {
    console.log(this.report.value);
  }

  teste () {
    console.log(this.report.value.tipoDenuncia)
  }
}
