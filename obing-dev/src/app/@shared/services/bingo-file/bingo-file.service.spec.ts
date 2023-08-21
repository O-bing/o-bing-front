import { TestBed } from '@angular/core/testing';

import { BingoFileService } from './bingo-file.service';

describe('BingoFileService', () => {
  let service: BingoFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingoFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
