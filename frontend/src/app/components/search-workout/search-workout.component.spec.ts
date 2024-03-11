import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWorkoutComponent } from './search-workout.component';

describe('SearchWorkoutComponent', () => {
  let component: SearchWorkoutComponent;
  let fixture: ComponentFixture<SearchWorkoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchWorkoutComponent]
    });
    fixture = TestBed.createComponent(SearchWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
