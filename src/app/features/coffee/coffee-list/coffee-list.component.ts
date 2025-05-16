import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

import { Coffee } from '../../../core/interfaces/coffee.interface';
import { CoffeeFormComponent } from '../coffee-form/coffee-form.component';
import { TemperaturePipe } from '../../../core/pipes/temperature.pipe';

@Component({
  selector: 'app-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrl: './coffee-list.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzDividerModule,
    NzPaginationModule,
    NzMessageModule,
    TemperaturePipe
  ]
})
export class CoffeeListComponent implements OnInit {
  coffeeData: Coffee[] = [];
  pageSize = 8;
  currentPage = 1;
  totalItems = 0;
  displayData: Coffee[] = [];
  loading = true;

  constructor(
    private modalService: NzModalService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadCoffeeData();
  }

  loadCoffeeData(): void {
    this.loading = true;
    setTimeout(() => {
      fetch('assets/coffee-data.json')
        .then(response => response.json())
        .then(data => {
          this.coffeeData = data;
          this.totalItems = this.coffeeData.length;
          this.updateDisplayData();
          this.loading = false;
        })
        .catch(error => {
          console.error('Error loading coffee data:', error);
          this.loading = false;
        });
    }, 500);
  }

  updateDisplayData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayData = this.coffeeData.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayData();
  }

  addCoffee(): void {
    const modal = this.modalService.create({
      nzTitle: 'Add New Coffee',
      nzContent: CoffeeFormComponent,
      nzWidth: 720,
      nzFooter: null
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        const newId = Math.max(0, ...this.coffeeData.map(c => c.id)) + 1;
        const newCoffee: Coffee = { ...result, id: newId };

        this.coffeeData = [...this.coffeeData, newCoffee];
        this.totalItems = this.coffeeData.length;

        this.updateDisplayData();

        this.messageService.success('Coffee added successfully!');
      }
    });
  }

  editCoffee(coffee: Coffee): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit Coffee',
      nzContent: CoffeeFormComponent,
      nzData: {
        coffee: { ...coffee }
      },
      nzWidth: 720,
      nzFooter: null
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        this.coffeeData = this.coffeeData.map(c =>
          c.id === result.id ? result : c
        );

        this.updateDisplayData();

        this.messageService.success('Coffee updated successfully!');
      }
    });
  }
}
