import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDefaultComponent } from './order-default.component';

describe('OrderDefaultComponent', () => {
  let component: OrderDefaultComponent;
  let fixture: ComponentFixture<OrderDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
