import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { UserGuard } from './guards/user/user.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
    import('./modules/home/home.module').then((m) => m.HomeModule),
    //canActivate: [UserGuard]
  },
  {
    path: 'auth',
    loadChildren: () =>
    import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
