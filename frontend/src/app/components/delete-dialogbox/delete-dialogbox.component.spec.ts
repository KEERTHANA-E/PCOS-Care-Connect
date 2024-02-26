import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogboxComponent } from './delete-dialogbox.component';

describe('DeleteDialogboxComponent', () => {
  let component: DeleteDialogboxComponent;
  let fixture: ComponentFixture<DeleteDialogboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDialogboxComponent]
    });
    fixture = TestBed.createComponent(DeleteDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
