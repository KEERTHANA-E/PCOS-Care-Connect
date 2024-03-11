import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEduComponent } from './add-edu.component';

describe('AddEduComponent', () => {
  let component: AddEduComponent;
  let fixture: ComponentFixture<AddEduComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEduComponent]
    });
    fixture = TestBed.createComponent(AddEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
