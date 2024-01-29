import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportRequestListComponent } from './support-request-list.component';

describe('SupportRequestListComponent', () => {
  let component: SupportRequestListComponent;
  let fixture: ComponentFixture<SupportRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
