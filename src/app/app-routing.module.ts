import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeComponent } from './component/exchange/exchange.component';
import { RateComponent } from './component/rate/rate.component';

const routes: Routes = [
  { path: 'inicio', component: ExchangeComponent },
  { path: 'actualizar', component: RateComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
