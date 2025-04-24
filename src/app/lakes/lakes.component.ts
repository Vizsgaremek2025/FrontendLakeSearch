import { Component } from '@angular/core';
import { LakeService } from '../services/lake.service';
import { Router } from '@angular/router';
import { Lake } from '../models/lake.model';
import { CountyService } from '../services/county.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatchService } from '../services/catch.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-lakes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lakes.component.html',
  styleUrl: './lakes.component.css'
})
export class LakesComponent {
  lakes: Lake[] = [];
  filteredLakes: Lake[] = [];
  searchText: string = '';
  selectedCounty: string = '';
  showOnlyFavorites: boolean = false;

  counties: { _id: string; name: string }[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 6;
  itemsPerPage: number = 6;
  lakeCatchCounts: { [lakeId: string]: number } = {};

  constructor(
    private lakeService: LakeService,
    private countyService: CountyService,
    private router: Router,
    private catchService: CatchService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadLakes();
    this.loadCounties();
  }

  loadCounties() {
    this.countyService.getCounties().subscribe({
      next: (response) => {
        this.counties = response.data;
      },
      error: (error) => {
        console.error('Hiba a megyék lekérésekor:', error);
      }
    });
  }

  loadLakes() {
    this.countyService.getCounties().subscribe({
      next: (response) => {
        this.lakes = [];
        const favorites = this.getFavoriteIds();

        for (let county of response.data) {
          for (let lake of county.lake) {
            lake.county = {
              _id: county._id,
              name: county.name
            };
            lake.isFavorite = favorites.includes(lake._id);
            this.lakes.push(lake);
          }
        }


        this.totalPages = Math.ceil(this.lakes.length / this.limit);
        this.applyPagination();
        this.loadCatchCounts();

      },
      error: (error) => {
        console.error('Hiba történt a tavak lekérésekor:', error);
      }
    });
  }

  toggleFavorite(lake: Lake): void {
    const user = this.authService.getLoggedInUser();
    if (!user) return;

    const key = `favorites_${user.email}`;
    let favorites = JSON.parse(localStorage.getItem(key) || '[]');

    if (favorites.includes(lake._id)) {
      favorites = favorites.filter((id: string) => id !== lake._id);
      lake.isFavorite = false;
    } else {
      favorites.push(lake._id);
      lake.isFavorite = true;
    }

    localStorage.setItem(key, JSON.stringify(favorites));
    this.applyFilter();
  }

  getFavoriteIds(): string[] {
    const user = this.authService.getLoggedInUser();
    if (!user) return [];
    const key = `favorites_${user.email}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  applyFilter() {
    let filtered = [...this.lakes];

    if (this.selectedCounty) {
      filtered = filtered.filter(lake => lake.county?._id === this.selectedCounty);
    }

    if (this.searchText.trim() !== '') {
      filtered = filtered.filter(lake =>
        lake.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (this.showOnlyFavorites) {
      filtered = filtered.filter(lake => lake.isFavorite);
    }

    this.filteredLakes = filtered;

    if (!this.selectedCounty && this.searchText.trim() === '' && !this.showOnlyFavorites) {
      this.applyPagination();
    }
  }

  applyPagination() {
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    this.filteredLakes = this.lakes.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  get disablePagination(): boolean {
    return this.searchText.trim() !== '' || this.selectedCounty !== '' || this.showOnlyFavorites;
  }

  loadCatchCounts(): void {
    this.lakes.forEach(lake => {
      this.catchService.getFishByLakeId(lake._id).subscribe(response => {
        this.lakeCatchCounts[lake._id] = response.success ? response.data.length : 0;
      });
    });
  }

  getCatchCount(lakeId: string): number {
    return this.lakeCatchCounts[lakeId] || 0;
  }

  viewDetails(lakeId: string | undefined) {
    if (!lakeId) return;
    this.router.navigate(['/lake-details', lakeId]);
  }

}
