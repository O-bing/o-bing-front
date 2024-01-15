import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { TestBed } from '@angular/core/testing';

import { BingoService } from './bingo.service';

describe('BingoService', () => {
  let service: BingoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(BingoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
