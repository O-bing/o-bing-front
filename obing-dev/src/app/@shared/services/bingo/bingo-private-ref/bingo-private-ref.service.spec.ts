import { TestBed } from '@angular/core/testing';

import { BingoPrivateRefService } from './bingo-private-ref.service';

describe('BingoPrivateRefService', () => {
  let service: BingoPrivateRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingoPrivateRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
