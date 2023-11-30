import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEndComponent } from './header-end.component';

describe('HeaderEndComponent', () => {
  let component: HeaderEndComponent;
  let fixture: ComponentFixture<HeaderEndComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderEndComponent]
    });
    fixture = TestBed.createComponent(HeaderEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
