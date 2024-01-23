import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalBingoListComponent } from './local-bingo-list.component';

describe('LocalBingoListComponent', () => {
  let component: LocalBingoListComponent;
  let fixture: ComponentFixture<LocalBingoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalBingoListComponent]
    });
    fixture = TestBed.createComponent(LocalBingoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
