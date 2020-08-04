import {Component, ViewEncapsulation} from '@angular/core';

import {ModalId, ScreenId, SidebarId, TileOverlayId, Ui} from '../../models/ui/ui';
import {KeyBindings} from '../../models/ui/key-bindings';

import {KeyBindingsStore} from '../../stores/key-bindings.store';
import {UiStore} from '../../stores/ui.store';

@Component({
  selector: '[app]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  ModalId = ModalId;
  ScreenId = ScreenId;
  SidebarId = SidebarId;

  keyBindings: KeyBindings;
  ui: Ui;

  constructor(
    private keyBindingsStore: KeyBindingsStore,
    private uiStore: UiStore
  ) {}

  ngOnInit() {
    this.subscribeToData();
    this.addEventListeners();
  }

  subscribeToData() {
    this.keyBindingsStore.keyBindings.subscribe(keyBindings => this.keyBindings = keyBindings);
    this.uiStore.ui.subscribe(ui => this.ui = ui);
  }

  addEventListeners() {
    // Using listeners rather than @HostListener since they could be called with .stopPropagation()
    document.addEventListener('wheel', this.documentOnWheel.bind(this), {passive: false});
    document.addEventListener('contextmenu', this.documentOnContextMenu.bind(this));
    document.addEventListener('keydown', this.documentOnKeydown.bind(this));
  }

  documentOnWheel(event) {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  }

  documentOnContextMenu(event: MouseEvent) {
    if (this.ui.sidebar !== SidebarId.DEV_TOOLS) {
      event.preventDefault();
    }
  }

  documentOnKeydown(event: KeyboardEvent) {
    event.preventDefault();

    // const isBody = (<Element>event.target).tagName === 'BODY';
    // if (!isBody) { return; }

    switch (event.code) {
      case this.keyBindings.toggleTileYield:
        this.uiStore.toggleTileOverlay(TileOverlayId.YIELD); break;
      case this.keyBindings.toggleTileText:
        this.uiStore.toggleTileOverlay(TileOverlayId.TEXT); break;
      case this.keyBindings.toggleTechTree:
        this.uiStore.toggleModal(ModalId.TECH_TREE); break;
      case this.keyBindings.toggleCivicsTree:
        this.uiStore.toggleModal(ModalId.CIVICS_TREE); break;
      case this.keyBindings.toggleMapEditor:
        this.uiStore.toggleSidebar(SidebarId.MAP_EDITOR); break;
      case this.keyBindings.toggleDevTools:
        this.uiStore.toggleSidebar(SidebarId.DEV_TOOLS); break;
    }
  }

}
