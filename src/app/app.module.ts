import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// COMPONENTS
import {AppComponent} from './components/app/app.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {WorldBuilderComponent} from './components/sidebars/world-builder/world-builder.component';
import {DevToolsComponent} from './components/sidebars/dev-tools/dev-tools.component';
import {PerformanceChartComponent} from './components/sidebars/dev-tools/components/performance-chart/performance-chart.component';
import {CameraFormComponent} from './components/sidebars/dev-tools/components/camera-form/camera-form.component';
import {MapSelectionFormComponent} from './components/sidebars/dev-tools/components/map-selection-form/map-selection-form.component';
import {GenerateMapFormComponent} from './components/sidebars/dev-tools/components/generate-map-form/generate-map-form.component';
import {MapComponent} from './components/map/map.component';
import {StatusBarComponent} from './components/hud/status-bar/status-bar.component';
import {MiniMapComponent} from './components/hud/mini-map/mini-map.component';
import {QuickLinksComponent} from './components/hud/quick-links/quick-links.component';
import {ViewportCenterMarkerComponent} from './components/hud/viewport-center-marker/viewport-center-marker.component';
import {CivicTreeComponent} from './components/modals/research/civic-tree/civic-tree.component';
import {TechnologyTreeComponent} from './components/modals/research/technology-tree/technology-tree.component';
import {InGameMenuComponent} from './components/modals/menus/in-game-menu/in-game-menu.component';
import {SaveGameComponent} from './components/modals/save-and-load/save-game/save-game.component';
import {LoadGameComponent} from './components/modals/save-and-load/load-game/load-game.component';
import {SaveDetailsComponent} from './components/modals/save-and-load/save-details/save-details.component';
import {GameOptionsMenuComponent} from './components/modals/menus/game-options-menu/game-options-menu.component';
import {ExitGameConfirmationComponent} from './components/modals/menus/exit-game-confirmation/exit-game-confirmation.component';

// DIRECTIVES

// SERVICES
import {CameraService} from './services/camera.service';
import {TileService} from './services/tile.service';
import {MapGeneratorService} from './services/map-generator.service';
import {YieldService} from './services/yield.service';
import {SaveService} from './services/save.service';
import {KeyboardService} from './services/keyboard.service';
import {MouseService} from './services/mouse.service';
import {GeneratorService} from './services/generator.service';
import {LocalStorageService} from './services/local-storage.service';

// STORES
import {CameraStore} from './stores/camera.store';
import {MapStore} from './stores/map.store';
import {KeyBindingsStore} from './stores/key-bindings.store';
import {SavesStore} from './stores/saves.store';
import {UiStore} from './stores/ui.store';
import {WorldBuilderUiStore} from './stores/world-builder-ui.store';

// PIPES
import {EraNamePipe} from './pipes/era-name.pipe';
import {TerrainBaseNamePipe} from './pipes/terrain-base-name.pipe';
import {TerrainFeatureNamePipe} from './pipes/terrain-feature-name.pipe';
import {TerrainImprovementNamePipe} from './pipes/terrain-improvement-name.pipe';
import {TerrainResourceNamePipe} from './pipes/terrain-resource-name.pipe';
import {CivicNamePipe} from './pipes/ciciv-name.pipe';
import {TechnologyNamePipe} from './pipes/technology-name.pipe';


const COMPONENTS = [
  AppComponent,
  MainMenuComponent,
  WorldBuilderComponent,
  DevToolsComponent,
  PerformanceChartComponent,
  CameraFormComponent,
  MapSelectionFormComponent,
  GenerateMapFormComponent,
  MapComponent,
  StatusBarComponent,
  MiniMapComponent,
  ViewportCenterMarkerComponent,
  QuickLinksComponent,
  CivicTreeComponent,
  TechnologyTreeComponent,
  InGameMenuComponent,
  SaveGameComponent,
  LoadGameComponent,
  SaveDetailsComponent,
  GameOptionsMenuComponent,
  ExitGameConfirmationComponent
]

const DIRECTIVES = [
]

const SERVICES = [
  CameraService,
  TileService,
  MapGeneratorService,
  YieldService,
  SaveService,
  KeyboardService,
  MouseService,
  GeneratorService,
  LocalStorageService,
]

const STORES = [
  CameraStore,
  MapStore,
  KeyBindingsStore,
  SavesStore,
  UiStore,
  WorldBuilderUiStore,
]

const PIPES = [
  EraNamePipe,
  TerrainBaseNamePipe,
  TerrainFeatureNamePipe,
  TerrainImprovementNamePipe,
  TerrainResourceNamePipe,
  CivicNamePipe,
  TechnologyNamePipe,
]

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: Window, useValue: window },
    ...SERVICES,
    ...STORES,
    ...PIPES
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
