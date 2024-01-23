import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoLocalCardComponent } from './bingo-local-card.component';

describe('BingoLocalCardComponent', () => {
  let component: BingoLocalCardComponent;
  let fixture: ComponentFixture<BingoLocalCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BingoLocalCardComponent]
    });
    fixture = TestBed.createComponent(BingoLocalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
