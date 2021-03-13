import { DeepSearchObject } from '../../../domain/Types';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-result-tab',
  templateUrl: './search-result-tab.component.html'
})
export class SearchResultTabComponent {
  @Input() resultItem: DeepSearchObject;
  @Input() pathRoot: string = '';

  constructor() { }

}
