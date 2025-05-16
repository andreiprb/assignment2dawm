import { NgModule } from '@angular/core';
import { CoffeeRoutingModule } from './coffee-routing.module';
import { CoffeeComponent } from './coffee.component';

@NgModule({
  imports: [
    CoffeeRoutingModule,
    CoffeeComponent
  ]
})
export class CoffeeModule { }
