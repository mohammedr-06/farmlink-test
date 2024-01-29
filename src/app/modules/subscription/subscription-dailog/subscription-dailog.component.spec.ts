import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDailogComponent } from './subscription-dailog.component';

describe('SubscriptionDailogComponent', () => {
  let component: SubscriptionDailogComponent;
  let fixture: ComponentFixture<SubscriptionDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
