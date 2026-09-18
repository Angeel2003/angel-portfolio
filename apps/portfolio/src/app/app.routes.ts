import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./features/experience/experience').then((m) => m.Experience),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects').then((m) => m.Projects),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/skills/skills').then((m) => m.Skills),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact').then((m) => m.Contact),
  },
];