import { Component } from '@angular/core';
import { Lake } from '../models/lake.model';
import { CountyService } from '../services/county.service';
import { Router } from '@angular/router';
import { CatchService } from '../services/catch.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-favorites-lake',
  standalone: true,
  imports: [],
  templateUrl: './favorites-lake.component.html',
  styleUrl: './favorites-lake.component.css'
})
export class FavoritesLakeComponent {
  favoriteLakes: Lake[] = [];
  lakeCatchCounts: { [lakeId: string]: number } = {};
  showEmptyStateModal: boolean = false;
  showDeleteConfirmationModal: boolean = false;
  lakeToDelete: string | null = null;
  currentUserKey: string = '';

  constructor(
    private countyService: CountyService,
    private router: Router,
    private catchService: CatchService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getLoggedInUser();
    if (user) {
      this.currentUserKey = `favorites_${user.email}`;
      this.loadFavorites();
    } else {
      console.error('Nincs bejelentkezett felhasználó!');
    }
  }

  loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem(this.currentUserKey) || '[]');

    this.countyService.getCounties().subscribe({
      next: (response) => {
        const allLakes: Lake[] = [];

        for (let county of response.data) {
          for (let lake of county.lake) {
            if (favorites.includes(lake._id)) {
              lake.county = { _id: county._id, name: county.name };
              allLakes.push({ ...lake, isFavorite: true });
            }
          }
        }

        this.favoriteLakes = allLakes;
        this.showEmptyStateModal = this.favoriteLakes.length === 0;
        this.loadCatchCounts();
      },
      error: (err) => {
        console.error('Hiba a tavak betöltésekor:', err);
      }
    });
  }

  confirmDelete(): void {
    if (this.lakeToDelete) {
      let favorites = JSON.parse(localStorage.getItem(this.currentUserKey) || '[]');
      favorites = favorites.filter((id: string) => id !== this.lakeToDelete);
      localStorage.setItem(this.currentUserKey, JSON.stringify(favorites));

      this.favoriteLakes = this.favoriteLakes.filter(lake => lake._id !== this.lakeToDelete);
      this.showEmptyStateModal = this.favoriteLakes.length === 0;
      this.closeDeleteModal();
    }
  }

  openDeleteModal(lakeId: string): void {
    this.lakeToDelete = lakeId;
    this.showDeleteConfirmationModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteConfirmationModal = false;
    this.lakeToDelete = null;
  }

  closeEmptyStateModal(): void {
    this.showEmptyStateModal = false;
  }

  loadCatchCounts(): void {
    this.favoriteLakes.forEach(lake => {
      this.catchService.getFishByLakeId(lake._id).subscribe(response => {
        this.lakeCatchCounts[lake._id] = response.success ? response.data.length : 0;
      });
    });
  }

  getCatchCount(lakeId: string): number {
    return this.lakeCatchCounts[lakeId] || 0;
  }

  navigateToLakes() {
    this.router.navigate(['/lakes']);
  }

  viewDetails(lakeId: string) {
    this.router.navigate(['/lake-details', lakeId]);
  }
}
