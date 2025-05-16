import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'coffee',
    loadChildren: () => import('./features/coffee/coffee.module').then(m => m.CoffeeModule)
  },
  {
    path: '',
    redirectTo: 'coffee',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'coffee'
  }
];
