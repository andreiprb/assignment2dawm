import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function priceValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    const price = typeof control.value === 'number'
      ? control.value
      : parseFloat(control.value);
    if (isNaN(price)) {
      return null;
    }
    const errors: ValidationErrors = {};
    if (price < min) {
      errors['priceMin'] = { min, actual: price };
    }
    if (price > max) {
      errors['priceMax'] = { max, actual: price };
    }
    return Object.keys(errors).length ? errors : null;
  };
}
