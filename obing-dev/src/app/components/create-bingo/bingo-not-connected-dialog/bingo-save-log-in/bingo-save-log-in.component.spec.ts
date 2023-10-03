import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoSaveLogInComponent } from './bingo-save-log-in.component';

describe('BingoSaveLogInComponent', () => {
  let component: BingoSaveLogInComponent;
  let fixture: ComponentFixture<BingoSaveLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoSaveLogInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoSaveLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
