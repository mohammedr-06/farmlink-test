import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupVerifyFarmerComponent } from './signup-verify-farmer.component';

describe('SignupVerifyFarmerComponent', () => {
  let component: SignupVerifyFarmerComponent;
  let fixture: ComponentFixture<SignupVerifyFarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupVerifyFarmerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupVerifyFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
