import { Injectable } from '@angular/core';
import {Request, RequestMethod} from '@angular/http';
import { CustomHttp } from "./customHttp"
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService {

  constructor(private customHttp: CustomHttp, private storage: Storage) {
  }

  login(login, id) {
    let value = {
      login: login,
      idAutorizacao: id,
      tokenApp: '45ddaa3ac1e0585c0528896d94464ae681662a87'
    };
    let request = new Request({
      url: 'http://hackathonapi.sefaz.al.gov.br/api/public/autenticar',
      method: RequestMethod.Post,
      body: JSON.stringify(value)
    });
    request.headers.set('Content-Type', 'application/json');
    return this.customHttp.request(request);
  }

  request(cpf, uuid) {
    let value = {
      login: cpf,
      tokenApp: '45ddaa3ac1e0585c0528896d94464ae681662a87',
      nomeDispositivo: uuid
    };
    let request = new Request({
      url: 'http://hackathonapi.sefaz.al.gov.br/sfz-habilitacao-aplicativo-api/api/public/autorizacao-aplicativo/solicitar',
      method: RequestMethod.Post,
      body: JSON.stringify(value)
    });
    request.headers.set('Content-Type', 'application/json');
    return this.customHttp.request(request);
  }

  getCPF() {
    return this.storage.get('login');
  }
}
