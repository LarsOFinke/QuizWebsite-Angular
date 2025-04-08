import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, MessageBoxComponent, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  hasError: boolean = false;
  message: string = '';
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  private loginService = inject(LoginService);
  private router = inject(Router);

  toggleShowPasswords(event: any): void {
    // Toggle the showPassword value based on checkbox state
    this.showPassword = event.target.checked;
  }

  login() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login-API-Call successful', response);
        // if (response.success) {
        console.log('Login successful');
        // this.username = response.username;
        this.router.navigate(['/main-menu']);
        // }
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }

  loginGuest() {
    this.loginService.loginGuest().then(response => this.router.navigate(['/main-menu']))
  }
}
