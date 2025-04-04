import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: 'listbox', loadComponent: () => import('./listbox/app') },
  { path: 'tabs', loadComponent: () => import('./tabs/app') },
  { path: 'toggle-group', loadComponent: () => import('./toggle-group/app') },
  { path: 'toggle', loadComponent: () => import('./toggle/app') },
  { path: 'switch', loadComponent: () => import('./switch/app') },
  { path: 'radio', loadComponent: () => import('./radio/app') },
  { path: 'progress', loadComponent: () => import('./progress/app') },
  { path: 'pagination', loadComponent: () => import('./pagination/app') },
  { path: 'slider', loadComponent: () => import('./slider/app') },
  { path: 'form-field', loadComponent: () => import('./form-field/app') },
  { path: 'date-picker', loadComponent: () => import('./date-picker/app') },
  { path: 'checkbox', loadComponent: () => import('./checkbox/app') },
  { path: 'avatar', loadComponent: () => import('./avatar/app') },
  { path: 'accordion', loadComponent: () => import('./accordion/app') },
  { path: 'button', loadComponent: () => import('./button/app') },
  { path: 'input', loadComponent: () => import('./input/app') },
];
