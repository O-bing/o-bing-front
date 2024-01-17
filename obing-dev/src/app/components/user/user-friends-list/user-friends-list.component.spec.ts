import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFriendsListComponent } from './user-friends-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UserFriendsListComponent', () => {
  let component: UserFriendsListComponent;
  let fixture: ComponentFixture<UserFriendsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
