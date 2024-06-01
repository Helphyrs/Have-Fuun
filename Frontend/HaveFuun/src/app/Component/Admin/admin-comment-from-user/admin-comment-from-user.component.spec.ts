import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommentFromUserComponent } from './admin-comment-from-user.component';

describe('AdminCommentFromUserComponent', () => {
  let component: AdminCommentFromUserComponent;
  let fixture: ComponentFixture<AdminCommentFromUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCommentFromUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCommentFromUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
