import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutContainerComponent } from './workout-container.component';

describe('WorkoutContainerComponent', () => {
  let component: WorkoutContainerComponent;
  let fixture: ComponentFixture<WorkoutContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutContainerComponent]
    });
    fixture = TestBed.createComponent(WorkoutContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
