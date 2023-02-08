import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoSearchComponent } from './bingo-search.component';

describe('BingoSearchComponent', () => {
  let component: BingoSearchComponent;
  let fixture: ComponentFixture<BingoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
