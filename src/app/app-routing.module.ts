import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./modules/user-dashboard/user-dashboard.module').then((m) => m.UserDashboardModule)
  },
  { 
    path: '**', 
    pathMatch: 'full', 
    redirectTo: '/users' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
