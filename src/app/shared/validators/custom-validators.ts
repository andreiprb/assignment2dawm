import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function priceMaxValidator(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const price = parseFloat(control.value);

    if (!isNaN(price) && price > max) {
      return { priceMax: { max, actual: price } };
    }

    return null;
  };
}
