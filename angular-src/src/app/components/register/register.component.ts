import { ValidateService } from './../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { FlashMessagesService } from 'angular2-flash-messages';

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

  constructor(private validateService: ValidateService, private flashMessagesService: FlashMessagesService) { }

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
    }


  }
}
