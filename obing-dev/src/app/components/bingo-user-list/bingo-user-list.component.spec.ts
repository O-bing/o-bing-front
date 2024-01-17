import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoUserListComponent } from './bingo-user-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BingoUserListComponent', () => {
  let component: BingoUserListComponent;
  let fixture: ComponentFixture<BingoUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      declarations: [ BingoUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
