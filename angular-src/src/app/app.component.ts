import { AuthService } from './services/auth.service';
import { Component, isDevMode } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-src';

  // tslint:disable-next-line:use-life-cycle-interface
  constructor(private authService: AuthService) {
    this.authService.apiUrl = environment.apiUrl;
  }

}
