import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LakeDetailsComponent } from './lake-details.component';

describe('LakeDetailsComponent', () => {
  let component: LakeDetailsComponent;
  let fixture: ComponentFixture<LakeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LakeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LakeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
