import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoUserListComponent } from './bingo-user-list.component';

describe('BingoUserListComponent', () => {
  let component: BingoUserListComponent;
  let fixture: ComponentFixture<BingoUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingoUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
