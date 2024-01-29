import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucherDashboardComponent } from './bucher-dashboard.component';

describe('BucherDashboardComponent', () => {
  let component: BucherDashboardComponent;
  let fixture: ComponentFixture<BucherDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucherDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BucherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
