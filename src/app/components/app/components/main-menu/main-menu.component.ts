import {Component, ViewEncapsulation} from '@angular/core';

import {Save} from '../../../../models/saves/save';
import {MapTypeId, ModalId, Ui} from '../../../../models/ui/ui';

import {GameMapStore} from '../../../../stores/game-map.store';
import {SavesStore} from '../../../../stores/saves.store';
import {UiStore} from '../../../../stores/ui.store';

@Component({
  selector: '.main-menu-component',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainMenuComponent {

  ui: Ui;
  saves: Save[];

  showSinglePlayerMenu = false;

  constructor(
    private uiStore: UiStore,
    private savesStore: SavesStore,
    private gameMapStore: GameMapStore
  ) {}

  ngOnInit() {
    this.uiStore.ui.subscribe(ui => this.ui = ui);
    this.savesStore.saves.subscribe(saves => this.saves = saves);
  }

  get noSavesPresent(): boolean {
    return this.saves.length === 0;
  }

  onSinglePlayerClick() {
    this.showSinglePlayerMenu = true;
  }

  onOptionsClick() {
    // TODO
    this.showSinglePlayerMenu = false;
  }

  onExitToGoogleClick() {
    this.uiStore.openModal(ModalId.EXIT_GAME_CONFIRMATION);
  }

  onResumeGameClick() {
    if (this.noSavesPresent) { return; }
    const latestTimestamp = this.saves.map(save => save.timestamp).sort().pop();
    const saveToBeLoaded = this.saves.find(save => save.timestamp === latestTimestamp);
    this.gameMapStore.next(saveToBeLoaded.gameMap);
    this.uiStore.setMapType(MapTypeId.STRATEGIC_CANVAS);
    this.uiStore.hideMainMenu();
    this.showSinglePlayerMenu = false;
  }

  onLoadGameClick() {
    if (this.noSavesPresent) { return; }
    // TODO
    this.uiStore.openModal(ModalId.LOAD_GAME);
  }

  onPlayNowClick() {
    // TODO
    this.showSinglePlayerMenu = false;
  }

  onCreateGameClick() {
    // TODO
    this.showSinglePlayerMenu = false;
  }

}
