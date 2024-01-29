import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerRequestListComponent } from './farmer-request-list.component';

describe('FarmerRequestListComponent', () => {
  let component: FarmerRequestListComponent;
  let fixture: ComponentFixture<FarmerRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
