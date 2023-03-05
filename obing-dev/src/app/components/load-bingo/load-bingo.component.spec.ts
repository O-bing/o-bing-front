import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBingoComponent } from './load-bingo.component';

describe('LoadBingoComponent', () => {
  let component: LoadBingoComponent;
  let fixture: ComponentFixture<LoadBingoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadBingoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBingoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
