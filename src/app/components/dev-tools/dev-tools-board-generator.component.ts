import {Component} from '@angular/core';

import {BoardSizeConfigurationId} from '../../models/board-size-configuration';
import {
  LandmassValueId,
  BoardGeneratorSettings,
  RainfallId,
  TemperatureId,
  WorldAgeId
} from '../../models/board-generator-settings';

import {BOARD_SIZE_CONFIGURATIONS} from '../../consts/board-size-configurations.const';

import {BoardGeneratorService} from '../../services/board-generator.service';

import {BoardStore} from '../../stores/board.store';

@Component({
  selector: 'dev-tools-board-generator',
  templateUrl: './dev-tools-board-generator.component.html'
})
export class DevToolsBoardGeneratorComponent {

  readonly BOARD_SIZE_CONFIGURATIONS = BOARD_SIZE_CONFIGURATIONS;
  readonly DEFAULT_SIZE_CONFIGURATION = BOARD_SIZE_CONFIGURATIONS[BoardSizeConfigurationId.DUEL];

  boardConfigurationId: BoardSizeConfigurationId = this.DEFAULT_SIZE_CONFIGURATION.id;
  settings: BoardGeneratorSettings = {
    width: this.DEFAULT_SIZE_CONFIGURATION.width,
    height:  this.DEFAULT_SIZE_CONFIGURATION.height,
    continents: this.DEFAULT_SIZE_CONFIGURATION.continents,
    islands: this.DEFAULT_SIZE_CONFIGURATION.islands,
    landmass: LandmassValueId.STANDARD,
    worldAge: WorldAgeId.STANDARD,
    temperature: TemperatureId.STANDARD,
    rainfall: RainfallId.STANDARD
  }

  constructor(
    private boardGeneratorService: BoardGeneratorService,
    private boardStore: BoardStore
  ) {}

  onBoardConfigurationIdChange(boardConfigurationId: BoardSizeConfigurationId) {
    const mapConfig = BOARD_SIZE_CONFIGURATIONS.find(mc => mc.id === Number(boardConfigurationId));
    if (mapConfig) {
      this.settings.width = mapConfig.width;
      this.settings.height = mapConfig.height;
      this.settings.continents = mapConfig.continents;
      this.settings.islands = mapConfig.islands;
    }
  }

  onGenerateBoardClick() {
    const map = this.boardGeneratorService.generateNewBoard(this.settings);
    this.boardStore.setBoard(map);
  }

}
