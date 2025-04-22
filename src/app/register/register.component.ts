import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  message: string = '';
  isSuccess: boolean = false;
  isSubmitted: boolean = false;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    //console.log(' RegisterComponent betöltődött!');
  }


  onSubmit(form: NgForm) {
    this.isSubmitted = true;


    if (form.invalid) {
      this.message = 'Minden mező kitöltése kötelező!';
      this.isSuccess = false;
      return;
    }


    if (!this.validateEmail(this.user.email)) {
      this.message = 'Kérlek, érvényes email címet adj meg!';
      this.isSuccess = false;
      return;
    }




    if (this.user.password !== this.user.confirmPassword) {
      this.message = 'A jelszavak nem egyeznek!';
      this.isSuccess = false;
      return;
    }


    if (this.user.password.length < 6) {
      this.message = 'A jelszónak legalább 6 karakter hosszúnak kell lennie!';
      this.isSuccess = false;
      return;
    }


    this.authService.register(this.user).subscribe({
      next: (res) => {
        // console.log('Sikeres regisztráció:', res);
        this.message = 'Sikeres regisztráció!';
        this.isSuccess = true;


        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Regisztrációs hiba:', err);
        this.message =err.error?.error || err.error?.msg || err.error?.message || err.message || 'Hiba történt a regisztráció során!';
        this.isSuccess = false;
      }
    });
  }


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }


  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
