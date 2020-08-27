import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';

import {GameMap, GameMapTile} from '../../../../../models/game-map/game-map';
import {Camera} from '../../../../../models/camera/camera';
import {Coords} from '../../../../../models/utils/coords';
import {Ui, TileOverlayId} from '../../../../../models/ui/ui';

import {CameraHelperService} from '../../../../../services/camera/camera-helper.service';

import {CameraStore} from '../../../../../stores/camera.store';
import {GameMapStore} from '../../../../../stores/game-map.store';
import {UiStore} from '../../../../../stores/ui.store';
import {CAMERA_ZOOM_LEVEL_TO_TILE_SIZE_MAP} from '../../../../../consts/camera/camera.const';

@Component({
  selector: '.strategic-view-component',
  templateUrl: './strategic-view.component.html',
  styleUrls: ['strategic-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StrategicViewComponent {

  TileOverlayId = TileOverlayId;

  gameMap: GameMap = null;
  camera: Camera = null;
  ui: Ui;

  @ViewChild('gameMapElem') gameMapElem: ElementRef;  // Map elem reference

  dragStartCoords: Coords;  // Page x, y when mouse was pressed down
  dragStartOffset: Coords;  // Map element x, y when mouse was pressed down

  isDragging = false;
  dragHandler: Function;

  constructor(
    private window: Window,
    private cameraHelperService: CameraHelperService,
    private gameMapStoreService: GameMapStore,
    private cameraStore: CameraStore,
    private uiStore: UiStore
  ) {}

  subscribeToData() {
    this.gameMapStoreService.gameMap.subscribe(gameMap => this.gameMap = gameMap);
    this.cameraStore.camera.subscribe(camera => this.camera = camera);
    this.uiStore.ui.subscribe(ui => this.ui = ui);
  }

  ngOnInit() {
    this.subscribeToData();
  }

  calcGameMapElemStyle(): Record<string, string> {
    return {transform: `translate(${this.camera.translate.x}px, ${this.camera.translate.y}px`};
  }

  normalizeVerticalTranslation(translate: Coords): Coords {
    const gameMapElemHeight = this.gameMapElem.nativeElement.offsetHeight;
    return this.cameraHelperService.normalizeVerticalTranslation(translate, gameMapElemHeight);
  }

  startDrag(event: MouseEvent) {
    this.dragStartCoords = {x: event.pageX, y: event.pageY};
    this.dragStartOffset = {x: this.camera.translate.x, y: this.camera.translate.y};

    // Need to store drag handler since .bind(this) changes the reference
    this.dragHandler = this.continueDrag.bind(this);
    document.addEventListener('mousemove', this.dragHandler as any);
    this.isDragging = true;
  }

  continueDrag(event: MouseEvent): any {
    // new translate without normalization
    let translate = {
      x: this.dragStartOffset.x + event.pageX - this.dragStartCoords.x,
      y: this.dragStartOffset.y + event.pageY - this.dragStartCoords.y
    }

    // normalize and set
    translate = this.normalizeVerticalTranslation(translate);
    this.cameraStore.setTranslate(translate);
  }

  stopDrag() {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.dragHandler as any);
  }

  onTileMouseDown(event: MouseEvent) {
    if (this.isDragging) { this.stopDrag(); }  // Unfortunately sometimes dragging is not disabled properly
    if (event.button === 0) {
      this.startDrag(event)
    }
  }

  onTileMouseUp(event: MouseEvent) {
    if (event.button === 0) {
      this.stopDrag()
    }
  }

  onTileWheel(event: WheelEvent) {
    // calculate new zoom level
    const step = this.cameraHelperService.wheelEventToStep(event);
    const currentZoomLevel = this.camera.zoomLevel;
    const newZoomLevel = this.cameraHelperService.normalizeZoomLevel(currentZoomLevel + step);
    if (newZoomLevel === currentZoomLevel) { return; }

    // calculate new translate
    const currentTranslate = this.camera.translate;
    const mapCoordsAtScreenCenter = this.cameraHelperService.mapCoordsAtScreenCenter(currentTranslate);
    const scale = CAMERA_ZOOM_LEVEL_TO_TILE_SIZE_MAP[newZoomLevel] / CAMERA_ZOOM_LEVEL_TO_TILE_SIZE_MAP[currentZoomLevel];

    // set zoom level first so it can used in normalization of the translation
    this.cameraStore.setZoomLevel(newZoomLevel);

    // calculate new translate, normalize then set it
    const newTranslate: Coords = {
      x: -Math.round((mapCoordsAtScreenCenter.x * scale) - (this.window.innerWidth / 2)),
      y: -Math.round((mapCoordsAtScreenCenter.y * scale) - (this.window.innerHeight / 2))
    }
    const normalizedTranslate = this.normalizeVerticalTranslation(newTranslate);
    this.cameraStore.setTranslate(normalizedTranslate);
  }

  onTileClick(event: MouseEvent, tile: GameMapTile) {
    // console.info('onTileClick: ', event, tile);
  }

  onTileDblclick(event: MouseEvent, tile: GameMapTile) {
    const currentTranslate = this.camera.translate;
    const mapCoordsAtScreenCenter = this.cameraHelperService.mapCoordsAtScreenCenter(currentTranslate);
    const centerOfClickedTile = this.cameraHelperService.centerOfTheTileCoords(tile);

    // The vector we need to apply to translation to move to desired position
    const translateVector: Coords = {
      x: mapCoordsAtScreenCenter.x - centerOfClickedTile.x,
      y: mapCoordsAtScreenCenter.y - centerOfClickedTile.y
    }

    // Calculate new translate, normalize it and use
    const newTranslate = {
      x: currentTranslate.x + translateVector.x,
      y: currentTranslate.y + translateVector.y
    }
    const normalizedTranslate = this.normalizeVerticalTranslation(newTranslate);
    this.cameraStore.setTranslate(normalizedTranslate);
  }

}