import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoTitleDialogComponent } from './bingo-title-dialog.component';

describe('BingoTitleDialogComponent', () => {
  let component: BingoTitleDialogComponent;
  let fixture: ComponentFixture<BingoTitleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoTitleDialogComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoTitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
