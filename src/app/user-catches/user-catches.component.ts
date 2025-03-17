import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-user-catches',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-catches.component.html',
  styleUrl: './user-catches.component.css'
})
export class UserCatchesComponent {
  user: UserModel | null = null;
  editMode = false;

  name = '';
  email = '';

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
  }

  cancelEdit() {
    if (this.user) {
      this.name = this.user.name;
      this.email = this.user.email;
    }
    this.editMode = false;
  }

  openEditModal() {
    this.editMode = true;
    if (this.user) {
      this.name = this.user.name;
      this.email = this.user.email;
    }
  }

  onSubmit() {
    this.authService.updateUser({ name: this.name, email: this.email }).subscribe({
      next: () => {
        if (this.user) {
          this.user.name = this.name;
          this.user.email = this.email;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.authService['loggedInUserSubject'].next(this.user);
        }
        this.editMode = false;
      },
      error: (err) => {
      }
    });
  }
}
