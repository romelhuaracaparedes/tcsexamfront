import { Component, OnInit } from '@angular/core';
import { Rate } from '../../model/rate';
import { RateService } from '../../services/rate.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { RateDto } from '../../model/rate-dto';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  frmRate!: FormGroup;
  status:number;
  rates:Array<Rate>=[];
  errors!:string[];
  constructor(private rateService: RateService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.listRates();
    this.frmRate=this.formBuilder.group(
      {
        origenCurrency : [''],
        destinationCurrency:[''],
        exchangeRate:['']

      }
    )
  }
  
  onSubmit(){
    const rateDTO:RateDto = this.frmRate.value;
    console.log(this.f().origenCurrency.value.id);
    rateDTO.exchangeRate=this.f().exchangeRate.value;
    rateDTO.origenCurrency=this.f().origenCurrency.value.id;
    rateDTO.destinationCurrency=this.f().destinationCurrency.value.id;
    this.rateService.update(rateDTO).subscribe(
      res=>{
          this.status=res.resultado;
          Swal.fire('Correcto',`El tipo cambio de: ${this.f().origenCurrency.value.code} 
           a ${this.f().destinationCurrency.value.code} se actualizó a ${this.f().exchangeRate.value}`);
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
    return this.frmRate.controls;
  }


}
