import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { AuthService } from './../../services/auth.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'ht-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(private validateService: ValidateService, private authService: AuthService,
    private flashMessagesService: FlashMessagesService, private router: Router) { }


  ngOnInit() {
  }

  login() {

    const user = {
      username: this.username,
      password: this.password,
    };

    if (!this.validateService.validateLogin(user)) {
      this.flashMessagesService.show('Please fill all the fields.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    } else {
      this.authService.loginUser(user).subscribe((data: Response) => {
        if (data['success'] === true) {
          this.authService.storeTokenData(data['token'], data['user']);
          this.router.navigate(['/dashboard']);
        } else {
          this.flashMessagesService.show(data['message'], { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
    }


  }

}
