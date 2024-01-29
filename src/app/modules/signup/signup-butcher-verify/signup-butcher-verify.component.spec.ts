import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupButcherVerifyComponent } from './signup-butcher-verify.component';

describe('SignupButcherVerifyComponent', () => {
  let component: SignupButcherVerifyComponent;
  let fixture: ComponentFixture<SignupButcherVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupButcherVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupButcherVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
