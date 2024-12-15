import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRideComponent } from './add-edit-ride.component';

describe('AddEditRideComponent', () => {
  let component: AddEditRideComponent;
  let fixture: ComponentFixture<AddEditRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditRideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
