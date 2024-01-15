import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFriendsListComponent } from './user-friends-list.component';

describe('UserFriendsListComponent', () => {
  let component: UserFriendsListComponent;
  let fixture: ComponentFixture<UserFriendsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      declarations: [UserFriendsListComponent]
    });
    fixture = TestBed.createComponent(UserFriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
