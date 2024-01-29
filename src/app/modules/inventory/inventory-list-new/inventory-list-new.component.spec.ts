import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListNewComponent } from './inventory-list-new.component';

describe('InventoryListNewComponent', () => {
  let component: InventoryListNewComponent;
  let fixture: ComponentFixture<InventoryListNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryListNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
