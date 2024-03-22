import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietContainerComponent } from './diet-container.component';

describe('DietContainerComponent', () => {
  let component: DietContainerComponent;
  let fixture: ComponentFixture<DietContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietContainerComponent]
    });
    fixture = TestBed.createComponent(DietContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
