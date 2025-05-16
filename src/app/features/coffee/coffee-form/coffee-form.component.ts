import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { Coffee } from '../../../core/interfaces/coffee.interface';
import { priceMaxValidator } from '../../../shared/validators/custom-validators';

@Component({
  selector: 'app-coffee-form',
  templateUrl: './coffee-form.component.html',
  styleUrl: './coffee-form.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzInputNumberModule
  ]
})
export class CoffeeFormComponent implements OnInit {
  @Input() coffee: Coffee | null = null;
  coffeeForm!: FormGroup;
  formTitle = 'Add Coffee';

  roastLevels = [
    { label: 'Light', value: 'Light' },
    { label: 'Medium-Light', value: 'Medium-Light' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Medium-Dark', value: 'Medium-Dark' },
    { label: 'Dark', value: 'Dark' }
  ];

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef
  ) {}

  ngOnInit(): void {
    this.initForm();

    if (this.coffee) {
      this.formTitle = 'Edit Coffee';
      this.coffeeForm.patchValue(this.coffee);
    }
  }

  initForm(): void {
    this.coffeeForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      origin: ['', Validators.required],
      roastLevel: ['Medium', Validators.required],
      price: [0, [Validators.required, Validators.min(0.1), priceMaxValidator(100)]],
      temperature: [90, [Validators.required, Validators.min(70), Validators.max(100)]]
    });
  }

  submitForm(): void {
    if (this.coffeeForm.valid) {
      this.modalRef.close(this.coffeeForm.value);
    } else {
      Object.values(this.coffeeForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  cancel(): void {
    this.modalRef.close();
  }
}
