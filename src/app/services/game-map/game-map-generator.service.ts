import {Injectable} from '@angular/core';

import {
  TerrainBaseId,
  TerrainFeatureId,
  TerrainImprovementId,
  TerrainResourceId
} from '../../models/game-map/terrain';

import {Coords} from '../../models/utils/coords';
import {GameMap, GameMapColumn, GameMapTile} from '../../models/game-map/game-map';
import {MapGeneratorSettings} from '../../models/map-generator/map-generator-settings';

import {GameMapHelperService} from './game-map-helper.service';

@Injectable({providedIn: 'root'})
export class GameMapGeneratorService {

  constructor(
    private gameMapHelperService: GameMapHelperService
  ) {}

  private createEmptyOceanTile(coords: Coords): GameMapTile {
    const tile = {
      coords,
      terrain: {
        base: {id: TerrainBaseId.OCEAN, variation: 1},
        feature: {id: TerrainFeatureId.NONE, variation: null},
        resourceId: TerrainResourceId.NONE,
        improvementId: TerrainImprovementId.NONE,
      }
    } as unknown as GameMapTile;

    tile.cssClasses = this.gameMapHelperService.calcTileCssClasses(tile);
    tile.yield = this.gameMapHelperService.calcTileYield(tile);

    return tile;
  }

  private createGameMapColumn(column: number, height: number): GameMapColumn {
    return {tiles: [...Array(height).keys()].map(row => this.createEmptyOceanTile({x: column, y: row}))}
  }

  private createGameMap(params: MapGeneratorSettings): GameMap {
    return {columns: [...Array(params.width).keys()].map(column => this.createGameMapColumn(column, params.height))}
  }

  public generateNewGameMap(params: MapGeneratorSettings): GameMap {
    const gameMap = this.createGameMap(params);
    return gameMap;
  }

}
