import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeftSideComponent } from './admin-left-side.component';

describe('AdminLeftSideComponent', () => {
  let component: AdminLeftSideComponent;
  let fixture: ComponentFixture<AdminLeftSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLeftSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
