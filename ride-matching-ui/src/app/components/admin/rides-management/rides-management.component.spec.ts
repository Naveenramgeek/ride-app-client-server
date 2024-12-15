import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesManagementComponent } from './rides-management.component';

describe('RidesManagementComponent', () => {
  let component: RidesManagementComponent;
  let fixture: ComponentFixture<RidesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RidesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
