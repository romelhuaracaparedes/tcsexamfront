import { Component, OnInit } from '@angular/core';
import { RateService } from '../../services/rate.service';
import { Rate } from '../../model/rate';
import { Exchange } from '../../model/exchange';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExchangeService } from '../../services/exchange.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  
  rates:Array<Rate>=[];
  frmExchange!: FormGroup;
  exchange:Exchange;
  errors!:string[];
  constructor(private formBuilder:FormBuilder
              ,private rateService: RateService
              ,private exchangeService: ExchangeService) {}
              

  ngOnInit(): void {
    this.listRates();
    this.frmExchange=this.formBuilder.group(
      {
        origenCurrency : [''],
        destinationCurrency:[''],
        amount:['']

      }
    )
  }

  onSubmit(){
    const exchange:Exchange = new Exchange();

    console.log(this.f().origenCurrency.value.id);
    exchange.amount=this.f().amount.value;
    exchange.origenCurrency=this.f().origenCurrency.value.id;
    exchange.destinationCurrency=this.f().destinationCurrency.value.id;
    this.exchangeService.converter(exchange).subscribe(
      res=>{
          this.exchange=res.resultado;
          Swal.fire(`RESULTADO \n \n Monto: ${this.exchange.amount} \n`+
                  `Moneda origen: ${this.f().origenCurrency.value.code} \n`+
                  `Moneda destino: ${this.f().destinationCurrency.value.code} \n`+
                  `Tipo cambio: ${this.exchange.exchangeRate} \n`+
                  `Monto Tipo cambio: ${this.exchange.changeAmount}`
          );
          
          this.errors=null;
        
        
      },
      error=>{
        this.errors=error.error.estado.detalle;
        
      }
    );
  }

  listRates(){
    this.rateService.getAllRates().subscribe(
      res =>{
        this.rates= res.resultado;
      }
    );
  }
  f(){
    return this.frmExchange.controls;
  }

}
