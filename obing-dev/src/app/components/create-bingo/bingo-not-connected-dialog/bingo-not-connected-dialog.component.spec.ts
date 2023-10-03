import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoNotConnectedDialogComponent } from './bingo-not-connected-dialog.component';

describe('BingoNotConnectedDialogComponent', () => {
  let component: BingoNotConnectedDialogComponent;
  let fixture: ComponentFixture<BingoNotConnectedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoNotConnectedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoNotConnectedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
