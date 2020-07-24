import {Component, Input, ViewEncapsulation} from '@angular/core';

import {Yield, YieldId, YieldOfType, YIELD_IDS_IN_ORDER} from '../../models/yield';

import {YIELD_ICONS} from '../../consts/yield-icons.const';

@Component({
  selector: 'yield',
  templateUrl: './yield.component.html',
  styleUrls: ['./yield.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class YieldComponent {

  @Input() yield: Yield;

  iconCssClasses: YieldId[][];

  private extractYieldOfType(yieldId: YieldId): YieldOfType {
    return {type: yieldId, value: this.yield[yieldId]};
  }

  private static filterOutZeroYields(yieldOfType: YieldOfType): boolean {
    return yieldOfType.value > 0;
  }

  private static yieldToIconCssClasses(yieldOfType: YieldOfType): YieldId[] {
    return new Array(yieldOfType.value).fill('fa ' + YIELD_ICONS[yieldOfType.type]);
  }

  ngOnChanges(e) {
    this.iconCssClasses = YIELD_IDS_IN_ORDER
      .map( yieldId => this.extractYieldOfType(yieldId) )
      .filter( yieldOfType => YieldComponent.filterOutZeroYields(yieldOfType) )
      .map( yieldOfType => YieldComponent.yieldToIconCssClasses(yieldOfType) )
  }

}
