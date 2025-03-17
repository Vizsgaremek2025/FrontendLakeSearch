import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCatchesComponent } from './user-catches.component';

describe('UserCatchesComponent', () => {
  let component: UserCatchesComponent;
  let fixture: ComponentFixture<UserCatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
