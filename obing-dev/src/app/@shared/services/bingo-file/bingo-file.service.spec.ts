import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { TestBed } from '@angular/core/testing';

import { BingoFileService } from './bingo-file.service';

describe('BingoFileService', () => {
  let service: BingoFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(BingoFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
