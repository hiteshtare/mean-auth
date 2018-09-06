import { DashboardComponent } from './../../components/dashboard/dashboard.component';
import { RegisterComponent } from './../../components/register/register.component';
import { LoginComponent } from './../../components/login/login.component';
import { HomeComponent } from './../../components/home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ProfileComponent } from '../../components/profile/profile.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // default
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
