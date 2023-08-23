import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoPlayComponent } from './bingo-play.component';

describe('BingoPlayComponent', () => {
  let component: BingoPlayComponent;
  let fixture: ComponentFixture<BingoPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
