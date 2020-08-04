import {Component} from '@angular/core';

import {YIELD_IDS_IN_ORDER} from '../../../../../models/game-map/yield'
import {YIELD_ICONS} from '../../../../../consts/game-map/yield-icons.const';

@Component({
  selector: '[status-bar]',
  templateUrl: './status-bar.component.html'
})
export class StatusBarComponent {

  YIELD_IDS_IN_ORDER = YIELD_IDS_IN_ORDER;
  YIELD_ICONS = YIELD_ICONS;

}
