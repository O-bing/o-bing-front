import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoSaveLogInComponent } from './bingo-save-log-in.component';

describe('BingoSaveLogInComponent', () => {
  let component: BingoSaveLogInComponent;
  let fixture: ComponentFixture<BingoSaveLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      declarations: [ BingoSaveLogInComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoSaveLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
