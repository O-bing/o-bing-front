import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { TestBed } from '@angular/core/testing';

import { TitleDocumentService } from './title-document.service';

describe('TitleDocumentService', () => {
  let service: TitleDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(TitleDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
