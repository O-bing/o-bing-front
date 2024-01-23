import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoLineComponent } from './bingo-line.component';

describe('BingoListComponent', () => {
  let component: BingoLineComponent;
  let fixture: ComponentFixture<BingoLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
