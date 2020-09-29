import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {Camera} from '../models/camera';
import {Coords} from '../models/utils';

import {CAMERA_ZOOM_LEVEL_TO_TILE_SIZE_MAP, DEFAULT_CAMERA} from '../consts/camera.const';
import {CameraService} from '../services/camera.service';

@Injectable()
export class CameraStore {

  private _camera: BehaviorSubject<Camera> = new BehaviorSubject(DEFAULT_CAMERA);

  public readonly camera: Observable<Camera> = this._camera.asObservable();

  constructor(
    private cameraService: CameraService,
  ) {}

  public next(camera: Camera) {
    this._camera.next(camera);
  }

  public setTileSize(tileSize: number) {
    this.next({...this._camera.value, tileSize});
  }

  public setTranslate(translate: Coords) {
    this.next({...this._camera.value, translate: this.cameraService.normalizeTranslation(translate)});
  }

  public setZoomLevel(zoomLevel: number) {
    this.next({...this._camera.value, zoomLevel, tileSize: CAMERA_ZOOM_LEVEL_TO_TILE_SIZE_MAP[zoomLevel]});
  }

  public resetAll() {
    this.next({...DEFAULT_CAMERA});
  }

}
