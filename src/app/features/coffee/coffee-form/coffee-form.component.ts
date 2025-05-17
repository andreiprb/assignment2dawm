import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { Coffee } from '../../../core/interfaces/coffee.interface';
import { priceMaxValidator } from '../../../shared/validators/custom-validators';

@Component({
  selector: 'app-coffee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzInputNumberModule,
    NzDividerModule,
    NzSliderModule
  ],
  templateUrl: './coffee-form.component.html',
  styleUrls: ['./coffee-form.component.scss']
})
export class CoffeeFormComponent implements OnInit {
  @Input() coffee?: Coffee;

  coffeeForm!: FormGroup;
  roastLevels = ['Light', 'Medium-Light', 'Medium', 'Medium-Dark', 'Dark'];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef
  ) {}

  // Price formatter and parser
  priceFormatter = (value: number): string => `$ ${value}`;
  priceParser = (value: string): number => parseFloat(value.replace('$ ', ''));

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.coffeeForm = this.fb.group({
      name: [this.coffee?.name || '', [Validators.required, Validators.minLength(3)]],
      origin: [this.coffee?.origin || '', Validators.required],
      roastLevel: [this.coffee?.roastLevel || 'Medium', Validators.required],
      price: [
        this.coffee?.price || 15.00,
        [Validators.required, Validators.min(5), priceMaxValidator(100)]
      ],
      temperature: [this.coffee?.temperature || 90, [Validators.required, Validators.min(80), Validators.max(100)]]
    });
  }

  submitForm(): void {
    if (this.coffeeForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.values(this.coffeeForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      this.modalRef.close(this.coffeeForm.value);
      this.isSubmitting = false;
    }, 500);
  }

  cancel(): void {
    this.modalRef.close();
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.coffeeForm.controls;
  }
}
