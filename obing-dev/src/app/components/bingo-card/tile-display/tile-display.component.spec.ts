import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileDisplayComponent } from './tile-display.component';
import { Tile } from 'src/app/types/Tile';

describe('TileDisplayComponent', () => {
  let component: TileDisplayComponent;
  let fixture: ComponentFixture<TileDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TileDisplayComponent]
    });
    fixture = TestBed.createComponent(TileDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/* TODO : Can't find a way to check if the tile in parameter of the component is correctly displayed

  it('should display a blank tile', () => {
    const blankTile: Tile = new Tile(0,'')
    blankTile.setStateToBlank()
    component.Tile = blankTile
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.tile .blankText')?.textContent).toContain('uy');
  })*/
});
