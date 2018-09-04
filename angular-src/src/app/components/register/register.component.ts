import { AuthService } from './../../services/auth.service';
import { ValidateService } from './../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'ht-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public name: string;
  public username: string;
  public email: string;
  public password: string;

  // tslint:disable-next-line:max-line-length
  constructor(private validateService: ValidateService, private authService: AuthService,
    private flashMessagesService: FlashMessagesService, private router: Router) { }

  ngOnInit() {
  }


  registerUser() {
    const user: User = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Please fill all the fields.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    } else if (!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Please fill valid email.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    } else {
      this.authService.addUser(user).subscribe((data: Response) => {
        if (data['success'] === true) {
          this.flashMessagesService.show(data['message'], { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login']);
        } else {
          this.flashMessagesService.show('Something went wrong!', { cssClass: 'alert-danger', timeout: 3000 });
          this.router.navigate(['/register']);
        }
      });
    }


  }
}
