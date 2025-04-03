import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model = {
    email: '',
    password: ''
  };
  message: string = '';
  isSuccess: boolean = false;
  isSubmitted: boolean = false;
  passwordFieldType: string = 'password';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isSubmitted = true;
    this.message = '';


    if (!this.model.email || !this.model.password) {
      this.message = 'Minden mező kitöltése kötelező!';
      this.isSuccess = false;
      return;
    }

    this.authService.login(this.model).subscribe({
      next: (successful: boolean) => {
        if (!successful) {
          this.message = 'Váratlan hiba történt!';
          this.isSuccess = false;
        } else {
          this.message = 'Sikeres bejelentkezés!'
          this.isSuccess = true;


          setTimeout(() => {
            if (this.authService.loggedinUser) {
              this.router.navigate(['lakes']);
            } else {
              this.router.navigate(['home']);
            }
          }, 2000);
        }
      },
      error: (err: any) => {
        console.error('Bejelentkezési hiba:', err);
        this.message = err.error?.message ?? 'Hibás email vagy jelszó!';
        this.isSuccess = false;
      }
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
