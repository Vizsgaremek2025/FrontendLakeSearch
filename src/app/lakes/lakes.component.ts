import { Component } from '@angular/core';
import { LakeService } from '../services/lake.service';
import { Router } from '@angular/router';
import { Lake } from '../models/lake.model';
import { CountyService } from '../services/county.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lakes',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './lakes.component.html',
  styleUrl: './lakes.component.css'
})
export class LakesComponent {
  lakes: Lake[] = [];
  filteredLakes: Lake[] = [];
  searchText: string = '';
  selectedCounty: string = '';
  counties: { _id: string; name: string }[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 6;
  itemsPerPage: number = 6;


  constructor(private lakeService: LakeService, private countyService: CountyService, private router: Router) {}

  ngOnInit(): void {
    this.loadLakes();
    this.loadCounties();
  }



  loadCounties() {
    this.countyService.getCounties().subscribe({
      next: (response) => {
        console.log('Megyék:', response.data);
        this.counties = response.data;
      },
      error: (error) => {
        console.error('Hiba a megyék lekérésekor:', error);
      }
    });
  }


  filterLakes() {
    console.log('Szűrési feltételek:', { searchText: this.searchText, selectedCounty: this.selectedCounty });

    this.filteredLakes = this.lakes.filter(lake => {
      const matchesCounty = this.selectedCounty ? lake.county?._id === this.selectedCounty : true;
      const matchesSearch = lake.name.toLowerCase().includes(this.searchText.toLowerCase());
      return matchesCounty && matchesSearch;
    });

    console.log('Szűrt tavak:', this.filteredLakes);


    if (!this.selectedCounty) {
      this.currentPage = 1;
      this.totalPages = Math.ceil(this.filteredLakes.length / this.itemsPerPage);
      this.applyPagination();
    }
  }


  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLakes();
    }
  }


  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLakes();
    }
  }

  get totalLakes(): number {
    return this.filteredLakes.length;
  }

  get disablePagination(): boolean {
    return this.selectedCounty !== '' && this.totalLakes <= this.itemsPerPage;
  }



  loadLakes() {
    this.countyService.getCounties().subscribe({
      next: (response) => {
        console.log('📥 Megyék és tavak:', response.data);

        this.lakes = [];
        for (let county of response.data) {
          for (let lake of county.lake) {
            lake.county = {
              _id: county._id,
              name: county.name
            };
            this.lakes.push(lake);
          }
        }


        this.totalPages = Math.ceil(this.lakes.length / this.limit);
        this.applyPagination();

        console.log('🌊 Összes tó:', this.lakes);
      },
      error: (error) => {
        console.error('❌ Hiba történt a tavak lekérésekor:', error);
      }
    });
  }


  applyPagination() {
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    this.filteredLakes = this.lakes.slice(start, end);
  }








  viewDetails(lakeId: string | undefined) {
    if (!lakeId) {
      console.error('🚨 Hiba: A tó ID undefined vagy üres!', lakeId);
      return;
    }

    console.log('🔍 Navigálás tó részleteihez:', lakeId);
    this.router.navigate(['/lake-details', lakeId]);
  }

}
