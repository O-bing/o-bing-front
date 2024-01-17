import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProfileComponent } from './header-profile.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HeaderProfileComponent', () => {
  let component: HeaderProfileComponent;
  let fixture: ComponentFixture<HeaderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      declarations: [ HeaderProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
