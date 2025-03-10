import { Component } from '@angular/core';
import { Catch, CatchResponse } from '../models/catches.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CatchService } from '../services/catch.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catches.component.html',
  styleUrl: './catches.component.css'
})
export class CatchesComponent {
  lakeId: number | null = null;
  catches: Catch[] = [];
  selectedCatch: Catch | null = null;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fishService: CatchService
  ) {}

  ngOnInit(): void {
    this.lakeId = this.route.snapshot.params['lakeId'];
    this.fishService.getFishByLakeId(this.lakeId).subscribe(
      (response: CatchResponse) => {
        if (response.success && response.data.length > 0) {
          this.catches = response.data;
        } else {
          this.errorMessage = 'Nincsenek elérhető fogások.';
        }
      },
      (error) => {
        this.errorMessage = 'Hiba történt a fogások lekérésekor.';
      }
    );
  }

  openModal(catchItem: Catch): void {
    this.selectedCatch = catchItem;
  }

  closeModal(): void {
    this.selectedCatch = null;
  }



  goBack(): void {
    this.router.navigate(['/lake-details', this.lakeId]);
  }
}
