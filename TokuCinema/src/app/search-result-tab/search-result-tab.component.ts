import { Component, OnInit, Input } from '@angular/core';
import { Keyword } from '../../domain/Keyword';

@Component({
  selector: 'app-search-result-tab',
  templateUrl: './search-result-tab.component.html'
})
export class SearchResultTabComponent implements OnInit {
  @Input() resultItem: {"name": string, "names": Array<Keyword>, "type": string, "path": string, "score": number};
  @Input() pathRoot: string;

  constructor() { }

  ngOnInit() {
  }

}
