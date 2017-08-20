import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'list-detail-page',
  templateUrl: 'list-detail.html'
})
export class ListDetailPage {
  report: {
    cnpjDestinatario: string,
    cnpjEmitente: string,
    dataEmissao: string,
    dataDenuncia: string,
    cpfCnpjDenunciante: string,
    cpfDestinatario: string,
    descricaoSituacao: string,
    situacao: string,
    tipoDocumento: string,
    valor: number
  }


  constructor( private navParams: NavParams ) {
    this.report = {
      cnpjDestinatario: this.navParams.get('cnpjDestinatario'),
      cnpjEmitente: this.navParams.get('cnpjEmitente'),
      dataEmissao: this.navParams.get('dataEmissao'),
      dataDenuncia: this.navParams.get('dataDenuncia'),
      cpfCnpjDenunciante: this.navParams.get('cpfCnpjDenunciante'),
      cpfDestinatario: this.navParams.get('cpfDestinatario'),
      descricaoSituacao: this.navParams.get('descricaoSituacao'),
      situacao: this.navParams.get('situacao'),
      tipoDocumento: this.navParams.get('tipoDocumento'),
      valor: this.navParams.get('valor')
    }
  }
}
