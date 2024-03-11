import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDialogoxComponent } from './share-dialogox.component';

describe('ShareDialogoxComponent', () => {
  let component: ShareDialogoxComponent;
  let fixture: ComponentFixture<ShareDialogoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareDialogoxComponent]
    });
    fixture = TestBed.createComponent(ShareDialogoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
