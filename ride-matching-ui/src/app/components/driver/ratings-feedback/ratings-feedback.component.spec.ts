import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsFeedbackComponent } from './ratings-feedback.component';

describe('RatingsFeedbackComponent', () => {
  let component: RatingsFeedbackComponent;
  let fixture: ComponentFixture<RatingsFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingsFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
