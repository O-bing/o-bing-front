import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoListComponent } from './bingo-list.component';

describe('BingoListComponent', () => {
  let component: BingoListComponent;
  let fixture: ComponentFixture<BingoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
