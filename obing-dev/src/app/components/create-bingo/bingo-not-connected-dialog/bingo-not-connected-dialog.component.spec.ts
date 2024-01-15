import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoNotConnectedDialogComponent } from './bingo-not-connected-dialog.component';

describe('BingoNotConnectedDialogComponent', () => {
  let component: BingoNotConnectedDialogComponent;
  let fixture: ComponentFixture<BingoNotConnectedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      declarations: [ BingoNotConnectedDialogComponent ],
      providers: [
        {provide: MatDialog, useValue: {}},
        {provide: MatDialogConfig, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoNotConnectedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
