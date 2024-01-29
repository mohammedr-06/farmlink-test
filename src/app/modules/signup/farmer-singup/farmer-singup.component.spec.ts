import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerSingupComponent } from './farmer-singup.component';

describe('FarmerSingupComponent', () => {
  let component: FarmerSingupComponent;
  let fixture: ComponentFixture<FarmerSingupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerSingupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
