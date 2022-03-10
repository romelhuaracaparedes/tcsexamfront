import { Injectable } from '@angular/core';
import { ServiceService } from './generic/service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RateResponse } from '../model/rate-response';
import { RateDto } from '../model/rate-dto';

@Injectable({
  providedIn: 'root'
})
export class RateService extends ServiceService{

  url=`${this.url_base}rates`;
  constructor(protected http : HttpClient) { 
    super(http);
  }
  

  public getAllRates(): Observable<RateResponse>{
    
    return this.http.get<RateResponse>(this.url+"/list");
  }

  public update(rate:RateDto){
    return this.http.put<any>(this.url+"/update", rate);
  }
}
