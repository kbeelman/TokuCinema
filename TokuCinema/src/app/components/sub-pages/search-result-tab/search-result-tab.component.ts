import { Component, Input } from '@angular/core';
import { Keyword } from '../../../domain/Keyword';

@Component({
  selector: 'app-search-result-tab',
  templateUrl: './search-result-tab.component.html'
})
export class SearchResultTabComponent {
  @Input() resultItem: {
    'name': string;
    'names': Array<Keyword>;
    'type': string;
    'path': string;
    'score': number;
    'iconName': string;
  };
  @Input() pathRoot: string;

  constructor() { }

}
