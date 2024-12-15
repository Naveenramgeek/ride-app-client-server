import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesListingPageComponent } from './rides-listing-page.component';

describe('RidesListingPageComponent', () => {
  let component: RidesListingPageComponent;
  let fixture: ComponentFixture<RidesListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RidesListingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidesListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
