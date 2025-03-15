
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-newcatch',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './newcatch.component.html',
  styleUrl: './newcatch.component.css'
})
export class NewcatchComponent {
  @Input() lake: any;

  availableFish: any[] = [];
  selectedFish: string = '';
  fishWeight: number | null = null;
  fishLength: number | null = null;
  catchDate: string = '';
  selectedMethod: string = '';
  bait: string = '';
  description: string = '';
  user: string = '';
  availableLakes: any[] = [];
  selectedLake: string = '';
  availableMethod: any[] = [];
  userId: string = '';
  maxDate: string = '';
  isModalOpen: boolean = false;
  image: File | null = null;
  takeCatch: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.getLakes();
    this.getFish();
    this.getMethod();
    this.getUser();

    const today = new Date();
    const day = ('0' + today.getDate()).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    this.maxDate = `${year}-${month}-${day}`;

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.image = file;
    }
  }

  getUser() {
    const loggedInUser = this.authService.getLoggedInUser();
    if (loggedInUser && loggedInUser._id) {
      this.userId = loggedInUser._id;
    } else {
      this.errorMessage = 'Hiba: Nem található bejelentkezett felhasználó!';
    }
  }

  getLakes() {
    this.http.get('http://localhost:3000/tavak').subscribe({
      next: (response: any) => {
        this.availableLakes = response.data;
      },
      error: (error) => {
        console.error('Hiba történt a tavak betöltésekor:', error);
        this.errorMessage = 'Hiba történt a tavak betöltésekor';
      }
    });
  }

  getFish() {
    this.http.get('http://localhost:3000/fish').subscribe({
      next: (response: any) => {
        this.availableFish = response.data;
      },
      error: (error) => {
        console.error('Hiba történt a halak betöltésekor:', error);
        this.errorMessage = 'Hiba történt a halak betöltésekor';
      }
    });
  }


  getMethod() {
    this.http.get('http://localhost:3000/method').subscribe({
      next: (response: any) => {
        this.availableMethod = response.data;
      },
      error: (error) => {
        console.error('Hiba történt a módszer betöltésekor:', error);
        this.errorMessage = 'Hiba történt a módszer betöltésekor';
      }
    });
  }


  saveCatch() {
    if (!this.selectedFish || !this.fishWeight || !this.fishLength || !this.catchDate || !this.selectedMethod || !this.bait || !this.description || !this.selectedLake) {
      this.errorMessage = 'Kérlek, tölts ki minden mezőt!';
      return;
    }

    const formData = new FormData();
    formData.append('fish', this.selectedFish);
    formData.append('weight', String(this.fishWeight));
    formData.append('length', String(this.fishLength));
    formData.append('date', this.catchDate);
    formData.append('method', this.selectedMethod);
    formData.append('lake', this.selectedLake);
    formData.append('bait', this.bait);
    formData.append('description', this.description);
    formData.append('user', this.userId);
    formData.append('takeCatch', String(this.takeCatch));

    if (this.image) {
      formData.append('img', this.image, this.image.name);
    }

    this.http.post('http://localhost:3000/catch/create', formData).subscribe({
      next: (response) => {
        console.log('Fogás sikeresen mentve!', response);
        this.isModalOpen = true;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Hiba történt a fogás mentésekor:', error);
        this.errorMessage = 'Hiba történt a fogás mentésekor';
      }
    });

  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
