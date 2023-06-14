import { TestBed } from '@angular/core/testing';

import { TitleDocumentService } from './title-document.service';

describe('TitleDocumentService', () => {
  let service: TitleDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
