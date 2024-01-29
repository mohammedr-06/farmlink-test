import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCatRequestListComponent } from './approve-cat-request-list.component';

describe('ApproveCatRequestListComponent', () => {
  let component: ApproveCatRequestListComponent;
  let fixture: ComponentFixture<ApproveCatRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveCatRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveCatRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
