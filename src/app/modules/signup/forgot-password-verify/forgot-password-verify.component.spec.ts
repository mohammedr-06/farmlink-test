import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordVerifyComponent } from './forgot-password-verify.component';

describe('ForgotPasswordVerifyComponent', () => {
  let component: ForgotPasswordVerifyComponent;
  let fixture: ComponentFixture<ForgotPasswordVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
