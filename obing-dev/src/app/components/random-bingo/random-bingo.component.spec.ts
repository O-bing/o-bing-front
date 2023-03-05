import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomBingoComponent } from './random-bingo.component';

describe('RandomBingoComponent', () => {
  let component: RandomBingoComponent;
  let fixture: ComponentFixture<RandomBingoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomBingoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomBingoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
