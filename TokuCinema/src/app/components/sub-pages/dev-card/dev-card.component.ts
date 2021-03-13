import { Developer } from '../../../domain/Types';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dev-card',
  templateUrl: './dev-card.component.html'
})
export class DevCardComponent {
  @Input() developer: Developer;

  constructor() { }

}
