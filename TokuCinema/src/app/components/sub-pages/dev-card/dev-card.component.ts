import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dev-card',
  templateUrl: './dev-card.component.html'
})
export class DevCardComponent {
  @Input() developer: {'name': string; 'imgUrl': string; 'bio': string; 'url': string};

  constructor() { }

}
