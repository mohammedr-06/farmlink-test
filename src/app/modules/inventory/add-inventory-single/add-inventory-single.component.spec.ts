import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventorySingleComponent } from './add-inventory-single.component';

describe('AddInventorySingleComponent', () => {
  let component: AddInventorySingleComponent;
  let fixture: ComponentFixture<AddInventorySingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInventorySingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInventorySingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
