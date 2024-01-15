import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoCardComponent } from './bingo-card.component';
import { of } from 'rxjs';

describe('BingoCardComponent', () => {
  let component: BingoCardComponent;
  let fixture: ComponentFixture<BingoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule        
      ],
      declarations: [ BingoCardComponent ],
      providers:[
        {provide:Router, useValue:{}},
        {provide: MatDialog, useValue: {}},
        {provide: ActivatedRoute, useValue: {
          paramMap: of(new Map(Object.entries({
            id: '34'
        })))
        }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
