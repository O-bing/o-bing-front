import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendCardComponent } from './friend-card.component';

describe('FriendCardComponent', () => {
  let component: FriendCardComponent;
  let fixture: ComponentFixture<FriendCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendCardComponent]
    });
    fixture = TestBed.createComponent(FriendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
