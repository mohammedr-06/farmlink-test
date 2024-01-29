import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucherLeftSideComponent } from './bucher-left-side.component';

describe('BucherLeftSideComponent', () => {
  let component: BucherLeftSideComponent;
  let fixture: ComponentFixture<BucherLeftSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucherLeftSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BucherLeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
