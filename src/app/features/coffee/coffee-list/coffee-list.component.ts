import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { Coffee } from '../../../core/interfaces/coffee.interface';
import { TemperaturePipe } from '../../../core/pipes/temperature.pipe';
import { CoffeeFormComponent } from '../coffee-form/coffee-form.component';

@Component({
  selector: 'app-coffee-list',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzDividerModule,
    NzIconModule,
    TemperaturePipe
  ],
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss']
})
export class CoffeeListComponent implements OnInit {
  coffeeList: Coffee[] = [];
  loading = true;

  constructor(private modalService: NzModalService) {}

  ngOnInit(): void {
    fetch('assets/coffee-data.json')
      .then(response => response.json())
      .then(data => {
        this.coffeeList = data;
        this.loading = false;
      })
      .catch(error => {
        console.error('Error loading coffee data:', error);
        this.loading = false;
      });
  }

  addCoffee(): void {
    const modal = this.modalService.create({
      nzTitle: 'Add New Coffee',
      nzContent: CoffeeFormComponent,
      nzFooter: null,
      nzWidth: 720
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        const newCoffee: Coffee = {
          ...result,
          id: this.getNextId()
        };
        this.coffeeList = [...this.coffeeList, newCoffee];
      }
    });
  }

  editCoffee(coffee: Coffee): void {
    const modal = this.modalService.create({
      nzTitle: 'Edit Coffee',
      nzContent: CoffeeFormComponent,
      nzFooter: null,
      nzWidth: 720
    });

    modal.componentInstance!.coffee = { ...coffee };

    modal.afterOpen.subscribe(() => {
      modal.componentInstance!.ngOnInit();
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        this.coffeeList = this.coffeeList.map(item =>
          item.id === coffee.id ? { ...result, id: coffee.id } : item
        );
      }
    });
  }

  deleteCoffee(coffee: Coffee): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this coffee?',
      nzContent: `${coffee.name} (${coffee.origin})`,
      nzOkText: 'Yes',
      nzOkDanger: true,
      nzOnOk: () => {
        this.coffeeList = this.coffeeList.filter(item => item.id !== coffee.id);
      },
      nzCancelText: 'No'
    });
  }

  private getNextId(): number {
    return Math.max(...this.coffeeList.map(coffee => coffee.id), 0) + 1;
  }
}
