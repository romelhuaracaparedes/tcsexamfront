import { Injectable } from '@angular/core';
import { ServiceService } from './generic/service.service';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ExchangeResponse } from '../model/exchange-response';
import { Exchange } from '../model/exchange';
import {map, catchError, tap} from 'rxjs/operators'
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService extends ServiceService{

  url=`${this.url_base}exchanges`;
  constructor(protected http : HttpClient) { 
    super(http);
  }

  public converter(exchange:Exchange){
    return this.http.post<ExchangeResponse>(this.url+"/currency-converter", exchange);
  }
}
