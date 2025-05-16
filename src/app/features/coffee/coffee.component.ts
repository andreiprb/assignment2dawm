import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss'],
  standalone: true,
  imports: [CommonModule, CoffeeListComponent]
})
export class CoffeeComponent {}
