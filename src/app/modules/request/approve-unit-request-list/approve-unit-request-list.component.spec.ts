import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveUnitRequestListComponent } from './approve-unit-request-list.component';

describe('ApproveUnitRequestListComponent', () => {
  let component: ApproveUnitRequestListComponent;
  let fixture: ComponentFixture<ApproveUnitRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveUnitRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveUnitRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
