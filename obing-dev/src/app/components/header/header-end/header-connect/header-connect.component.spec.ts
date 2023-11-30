import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderConnectComponent } from './header-connect.component';

describe('HeaderConnectComponent', () => {
  let component: HeaderConnectComponent;
  let fixture: ComponentFixture<HeaderConnectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderConnectComponent]
    });
    fixture = TestBed.createComponent(HeaderConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
