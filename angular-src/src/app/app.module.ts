import { AuthService } from './services/auth.service';
// Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Core Modules

// Other Modules
import { FlashMessagesModule } from 'angular2-flash-messages';
// Other Modules

// Custom Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
// Custom Components

// Custom Services
import { ValidateService } from './services/validate.service';
// Custom Services

// Routing
import { appRoutingProviders, routing } from './shared/routes/app.routing';
import { HttpClientModule } from '@angular/common/http';
// Routing

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    routing,
    HttpClientModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [appRoutingProviders, ValidateService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
