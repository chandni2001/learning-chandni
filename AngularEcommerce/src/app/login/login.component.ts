import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  login() {
    alert('You are logged in!');
  }

  forgotPassword() {
    alert('Your new password has been mailed to you.');
  }

}
