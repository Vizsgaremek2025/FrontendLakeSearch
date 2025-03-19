import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../models/UserModel';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-catches',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-catches.component.html',
  styleUrl: './user-catches.component.css'
})
export class UserCatchesComponent {

  userId: string = '';
  userCatches: any[] = [];
  message: string = '';
  showModal: boolean = false;
  showDeleteModal: boolean = false;
  showEmptyModal: boolean = false;
  selectedCatch: any = null;

  constructor(private http: HttpClient, private authService: AuthService ,private router: Router) {}

  ngOnInit(): void {
    this.getUser();
    this.getUserCatches();
  }

  getUser() {
    const loggedInUser = this.authService.getLoggedInUser();
    if (loggedInUser && loggedInUser._id) {
      this.userId = loggedInUser._id;
    } else {
      alert('Hiba: Nem található bejelentkezett felhasználó!');
    }
  }

  getUserCatches() {
    if (this.userId) {
      this.http.get<any>(`http://localhost:3000/catch/user/${this.userId}`).subscribe({
        next: (response) => {
          this.userCatches = response.data;
          this.showEmptyModal = this.userCatches.length === 0;
        },
        error: (error) => {
          console.error('Hiba történt a fogások betöltésekor:', error);
          alert('Hiba történt a fogások betöltésekor');
        }
      });
    }
  }

  navigateToCatchCreation() {
    this.router.navigate(['/newcatch']);
  }

  closeEmptyModal() {
    this.showEmptyModal = false;
  }


  editCatch(catchItem: any) {
    this.selectedCatch = catchItem;
    this.showModal = true;
  }

  saveCatch() {
    if (this.selectedCatch) {
      this.http.put<any>(`http://localhost:3000/catch/${this.selectedCatch._id}`, this.selectedCatch).subscribe({
        next: (response) => {
          this.message = 'Fogás sikeresen mentve!';
          this.getUserCatches();
          this.closeModal();
        },
        error: (error) => {
          console.error('Hiba történt a fogás mentésekor:', error);
          this.message = 'Hiba történt a fogás mentésekor';
        }
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedCatch = null;
  }

  confirmDelete(catchItem: any) {
    this.selectedCatch = catchItem;
    this.showDeleteModal = true;
  }

  deleteConfirmed() {
    if (this.selectedCatch) {
      this.http.delete<any>(`http://localhost:3000/catch/${this.selectedCatch._id}`).subscribe({
        next: (response) => {
          this.message = 'Fogás sikeresen törölve!';
          this.getUserCatches();
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error('Hiba történt a fogás törlésénél:', error);
          this.message = 'Hiba történt a fogás törlésénél';
        }
      });
    }
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedCatch = null;
  }
}
