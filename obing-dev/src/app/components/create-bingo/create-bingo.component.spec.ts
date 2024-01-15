import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBingoComponent } from './create-bingo.component';

describe('CreateBingoComponent', () => {
  let component: CreateBingoComponent;
  let fixture: ComponentFixture<CreateBingoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      declarations: [ CreateBingoComponent ],
      providers: [
        {provide: MatDialog, useValue: {}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBingoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
