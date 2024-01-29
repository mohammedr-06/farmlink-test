import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButchersSignupComponent } from './butchers-signup.component';

describe('ButchersSignupComponent', () => {
  let component: ButchersSignupComponent;
  let fixture: ComponentFixture<ButchersSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButchersSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButchersSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
