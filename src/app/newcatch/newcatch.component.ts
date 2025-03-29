
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-newcatch',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  errorMessages:string[]=[]
  generalMaxWeight: number = 50;
  generalMaxLength: number = 150;

  constructor(private http: HttpClient, private authService: AuthService) { }

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
    this.errorMessages = [];

    if (this.fishWeight! > this.generalMaxWeight || this.fishLength! > this.generalMaxLength) {
      this.errorMessages.push(`A megadott súly vagy hossz irreális érték (max ${this.generalMaxWeight} kg és ${this.generalMaxLength} cm)!`);
      return;
    }

    if (!this.selectedFish || !this.fishWeight || !this.fishLength || !this.catchDate || !this.selectedMethod || !this.bait || !this.description || !this.selectedLake) {
      this.errorMessages.push('Kérlek, tölts ki minden mezőt!');
      return;
    }

    if (this.takeCatch) {
      const selectedFishData = this.availableFish.find(fish => fish._id === this.selectedFish);
      if (selectedFishData && selectedFishData.curfew?.start && selectedFishData.curfew?.end) {
        const [catchYear, catchMonth, catchDay] = this.catchDate.split('-').map(Number);
        const catchDateStr = `${catchMonth}-${catchDay}`;

        if (this.isDateBetween(catchDateStr, selectedFishData.curfew.start, selectedFishData.curfew.end)) {
          this.errorMessages.push(`Ebben az időszakban a hal nem fogható! (${selectedFishData.curfew.start} - ${selectedFishData.curfew.end}) `);
          return;
        }
      }
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
    formData.append('catchandrelease', this.takeCatch ? 'false' : 'true');




    if (this.image) {
      formData.append('img', this.image, this.image.name);
    }

    this.http.post('http://localhost:3000/catch/create', formData).subscribe({
      next: (response) => {
        console.log('Fogás sikeresen mentve!', response);
        this.isModalOpen = true;
        this.errorMessages = [];
        this.resetForm();
      },
      error: (error) => {
        console.error('Hiba történt a fogás mentésekor:', error);

        if (error.error.message) {
          this.errorMessages.push(error.error.message);
        } else {
          this.errorMessages.push('Hiba történt a fogás mentésekor.');
        }
      }
    });
  }

  isDateBetween(date: string, start: string, end: string): boolean {
    const [month, day] = date.split('-').map(Number);
    const [startMonth, startDay] = start.split('-').map(Number);
    const [endMonth, endDay] = end.split('-').map(Number);

    const catchDate = new Date(2024, month - 1, day);
    const startDate = new Date(2024, startMonth - 1, startDay);
    const endDate = new Date(2024, endMonth - 1, endDay);

    if (startDate <= endDate) {
      return catchDate >= startDate && catchDate <= endDate;
    } else {
      return catchDate >= startDate || catchDate <= endDate;
    }
  }


  resetForm() {
    this.selectedFish = '';
    this.fishWeight = null;
    this.fishLength = null;
    this.catchDate = '';
    this.selectedMethod = '';
    this.bait = '';
    this.description = '';
    this.selectedLake = '';
    this.image = null;
    this.takeCatch = false;


    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
