import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcatchComponent } from './newcatch.component';

describe('NewcatchComponent', () => {
  let component: NewcatchComponent;
  let fixture: ComponentFixture<NewcatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewcatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewcatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
