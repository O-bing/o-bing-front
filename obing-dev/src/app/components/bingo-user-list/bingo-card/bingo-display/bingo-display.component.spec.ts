import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoDisplayComponent } from './bingo-display.component';

describe('BingoDisplayComponent', () => {
  let component: BingoDisplayComponent;
  let fixture: ComponentFixture<BingoDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
