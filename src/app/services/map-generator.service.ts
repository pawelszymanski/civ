import {Injectable} from '@angular/core';

import {GameMap, GameMapTile} from '../models/game-map';
import {TerrainBaseId, TerrainElevationId, TerrainFeatureId, TerrainResourceId} from '../models/terrain';
import {YieldId} from '../models/yield';
import {MapGeneratorSettings} from '../models/map-generator-settings';

@Injectable({providedIn: 'root'})
export class MapGeneratorService {

  private generateBoardTile(x: number, y: number): GameMapTile {
    return {
      coords: {
        x,
        y
      },
      terrain: {
        base: TerrainBaseId.OCEAN,
        elevation: TerrainElevationId.FLAT,
        feature: TerrainFeatureId.NONE,
        resource: TerrainResourceId.NONE
      },
      // yield: {
      //   [YieldId.GOLD]: 0,
      //   [YieldId.SCIENCE]: 0,
      //   [YieldId.PRODUCTION]: 0,
      //   [YieldId.CULTURE]: 0,
      //   [YieldId.RELIGION]: 0,
      //   [YieldId.POWER]: 0,
      //   [YieldId.TOURISM]: 0
      // }
    };
  }

  private generateBoardRow(rowId: number, width: number) {
    return {tiles: [...Array(width).keys()].map(x => this.generateBoardTile(x, rowId))}
  }

  private generateBoard(params: MapGeneratorSettings): GameMap {
    return {rows: [...Array(params.height).keys()].map(y => this.generateBoardRow(y, params.width))}
  }

  public generateNewGameMap(params: MapGeneratorSettings): GameMap {
    const map = this.generateBoard(params);
    return map;
  }

}