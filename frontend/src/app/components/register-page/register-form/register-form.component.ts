import { Component, inject } from '@angular/core';
import { RegisterService } from '../../../services/register.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, RouterLink, MessageBoxComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  hasError: boolean = false;
  message: string = '';
  username: string = '';
  password: string = '';
  password_confirm: string = '';
  showPassword: boolean = false;

  private registerService = inject(RegisterService);
  private router = inject(Router);

  toggleShowPasswords(event: any): void {
    // Toggle the showPassword value based on checkbox state
    this.showPassword = event.target.checked;
  }

  register() {
    this.registerService.register(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Register-API-Call successfull', response);
        // if (response.success) {
        console.log('Registration successful');
        this.router.navigate(['/']);
        // }
      },
      error: (error) => {
        console.error('Registration failed', error);
      },
    });
  }
}
