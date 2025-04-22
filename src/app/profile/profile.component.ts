import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: UserModel | null = null;
  editMode = false;
  activeTab: 'details' | 'password' = 'details';
  currentPasswordFieldType: string = 'password';
  newPasswordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  name = '';
  email = '';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  showErrorModal = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser();
    if (this.user) {
      this.name = this.user.name;
      this.email = this.user.email;
    }
  }

  enableEdit() {
    this.editMode = true;
    this.activeTab = 'details';
  }

  cancelEdit() {
    if (this.user) {
      this.name = this.user.name;
      this.email = this.user.email;
    }
    this.editMode = false;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.successMessage = '';
  }

  onSubmitDetails() {
    this.authService.updateUser({ name: this.name, email: this.email }).subscribe({
      next: () => {
        if (this.user) {
          this.user.name = this.name;
          this.user.email = this.email;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.authService['loggedInUserSubject'].next(this.user);
        }
        this.editMode = false;
        this.successMessage = 'A profil sikeresen mentésre került!';
      },
      error: (err) => {
        console.error('Hiba a profil mentésekor:', err);
        this.errorMessage = 'Hiba történt a profil mentésekor.';
        this.showErrorModal = true;
      }
    });
  }

  onSubmitPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'A jelszavak nem egyeznek!';
      this.showErrorModal = true;
      return;
    }

    this.authService.updatePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.cancelEdit();
        this.successMessage = 'A jelszó sikeresen frissítve lett!';
      },
      error: (err) => {
        console.error('Hiba a jelszó frissítésekor:', err);
        if (err.status === 401) {
          this.errorMessage = 'A megadott jelenlegi jelszó helytelen.';
        } else {
          this.errorMessage = 'Hiba történt a jelszó frissítésekor.';
        }
        this.showErrorModal = true;
      }
    });
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }

  toggleCurrentPasswordVisibility() {
    this.currentPasswordFieldType = this.currentPasswordFieldType === 'password' ? 'text' : 'password';
  }

  toggleNewPasswordVisibility() {
    this.newPasswordFieldType = this.newPasswordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }

}
