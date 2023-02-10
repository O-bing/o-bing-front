import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBingoComponent } from './create-bingo.component';

describe('CreateBingoComponent', () => {
  let component: CreateBingoComponent;
  let fixture: ComponentFixture<CreateBingoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBingoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBingoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
