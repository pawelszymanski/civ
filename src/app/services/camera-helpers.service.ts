import {Injectable} from '@angular/core';

import {Coords} from '../models/utils/coords';

import {CAMERA_MAX_EMPTY_WINDOW_SPACE_PC, CAMERA_MAX_ZOOM_LEVEL, CAMERA_MIN_ZOOM_LEVEL} from '../consts/camera/camera.const';
import {TILE_SIZE_CSS_VAR_NAME} from '../consts/camera/tile-size-css-var-name.const';

import {GameMapTile} from '../models/game-map/game-map';
import {Step} from '../models/utils/step';

@Injectable({providedIn: 'root'})
export class CameraHelpersService {

  constructor(
    private window: Window
  ) {}

  public getTileSizeCssVariable(): number {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue(TILE_SIZE_CSS_VAR_NAME));
  }

  public setTileSizeCssVariable(tileSize: number) {
    document.documentElement.style.setProperty(TILE_SIZE_CSS_VAR_NAME, `${tileSize}px`);
  }

  // +1 for zooming in (roll forward), -1 for zooming out (roll backward)
  public wheelEventToStep(wheelEvent: WheelEvent): Step {
    return -(Math.abs(wheelEvent.deltaY) / wheelEvent.deltaY) as Step;
  }

  // Box model width of the .game-map-tile element
  // Vertical size is between vertexes, horizontally its from edge to edge, hence smaller.
  public tileSizeToGameMapTileElemWidth(tileSize: number): number {
    return Math.floor(tileSize * 0.9);
  }

  // Box model height of the .game-map-row element
  // .game-map-tile has a negative margin in CSS of calc(25% + 1) hence it takes calc(75% - 1px) horizontal space
  public tileSizeToGameMapRowElemHeight(tileSize: number): number {
    return Math.floor(tileSize * 0.75) - 1;
  }

  // CSS coordinates of the center of the tile on the game map
  public centerOfTheTileCoords(tile: GameMapTile): Coords {
    const tileSize = this.getTileSizeCssVariable();                   // root variable for size calculations, eg. 100px
    const tileWidth = this.tileSizeToGameMapTileElemWidth(tileSize);  // box model width, eg. 90px
    const rowHeight = this.tileSizeToGameMapRowElemHeight(tileSize);  // box model height, eg. 74px

    const xCssFix = ((tile.coords.y % 2 === 1) ? Math.floor(tileWidth / 2) : 0);  // Move odd (0-based) rows to right
    const yCssFix = ((tileSize - rowHeight) / 2);  // Adjust for a CSS box model that had negative margin

    return {
      x: (tile.coords.x + 0.5) * tileWidth + xCssFix,
      y: (tile.coords.y + 0.5) * rowHeight + yCssFix
    }
  }

  public mapCoordsAtScreenCenter(currentTranslate: Coords): Coords {
    return {
      x: Math.floor((this.window.innerWidth / 2) - currentTranslate.x),
      y: Math.floor((this.window.innerHeight / 2) - currentTranslate.y)
    }
  }

  // Keep zoomLevel in between min and max
  public normalizeZoomLevel(zoomLevel: number): number {
    if (zoomLevel > CAMERA_MAX_ZOOM_LEVEL) { zoomLevel = CAMERA_MAX_ZOOM_LEVEL }
    if (zoomLevel < CAMERA_MIN_ZOOM_LEVEL) { zoomLevel = CAMERA_MIN_ZOOM_LEVEL }
    return zoomLevel;
  }

  // Makes the ui always show at max CAMERA_MAX_EMPTY_WINDOW_SPACE_PC percent of background while panning vertically
  public normalizeVerticalTranslation(translate: Coords, gameMapElemHeight: number): Coords {
    const windowHeight = this.window.innerHeight;

    const maxEmptyVerticalSpace = Math.floor(windowHeight * CAMERA_MAX_EMPTY_WINDOW_SPACE_PC / 100);

    if (gameMapElemHeight < windowHeight) {
      // centering game map vertically
      translate.y = Math.floor((windowHeight - gameMapElemHeight) / 2);
    } else {
      // limiting vertical panning top and bottom
      if (translate.y > maxEmptyVerticalSpace) { translate.y = maxEmptyVerticalSpace; }
      const maxBottom = -(gameMapElemHeight - windowHeight + maxEmptyVerticalSpace);
      if (maxBottom > translate.y) { translate.y = maxBottom; }
    }

    return translate;
  }

}
