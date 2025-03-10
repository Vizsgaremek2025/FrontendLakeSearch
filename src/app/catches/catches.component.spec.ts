import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchesComponent } from './catches.component';

describe('CatchesComponent', () => {
  let component: CatchesComponent;
  let fixture: ComponentFixture<CatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
