import { DashboardComponent } from './../../modules/dashboard/dashboard.component';
import { RegisterComponent } from './../../modules/register/register.component';
import { LoginComponent } from './../../modules/login/login.component';
import { HomeComponent } from './../../modules/home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // default
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
