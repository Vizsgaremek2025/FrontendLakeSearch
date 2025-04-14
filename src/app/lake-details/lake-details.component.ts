import { Component } from '@angular/core';
import { Lake } from '../models/lake.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LakeService } from '../services/lake.service';

@Component({
  selector: 'app-lake-details',
  standalone: true,
  imports: [],
  templateUrl: './lake-details.component.html',
  styleUrl: './lake-details.component.css'
})
export class LakeDetailsComponent {
  lake: Lake | undefined;
  fish: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lakeService: LakeService
  ) {}

  ngOnInit(): void {
    const lakeId = this.route.snapshot.paramMap.get('id');
    // console.log('Tó ID:', lakeId);

    if (!lakeId) {
      console.error('Hiba: nincs érvényes tó ID az URL-ben!');
      this.router.navigate(['/lakes']);
      return;
    }

    this.lakeService.getLakeById(lakeId).subscribe({
      next: (response) => {
        // console.log('Backend válasz:', response);
        this.lake = response.data;
      },
      error: (err) => {
        console.error('Hiba történt:', err);
        this.router.navigate(['/lakes']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/lakes']);
  }

  scrollToTop() {
    window.scrollTo({ top: 0 });
  }

  navigateToCatches() {
    if (this.lake && this.lake._id) {
      this.router.navigate(['/catches', this.lake._id]);
    } else {
      console.error('Nincs érvényes tó _id!');
    }
  }

  openRoute() {
    if (this.lake?.coordinates) {
      const query = encodeURIComponent(this.lake.coordinates);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`);
    }
  }
}
