import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesLakeComponent } from './favorites-lake.component';

describe('FavoritesLakeComponent', () => {
  let component: FavoritesLakeComponent;
  let fixture: ComponentFixture<FavoritesLakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesLakeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesLakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
