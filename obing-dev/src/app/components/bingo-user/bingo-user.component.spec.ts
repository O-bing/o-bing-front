import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoUserComponent } from './bingo-user.component';

describe('BingoUserComponent', () => {
  let component: BingoUserComponent;
  let fixture: ComponentFixture<BingoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
