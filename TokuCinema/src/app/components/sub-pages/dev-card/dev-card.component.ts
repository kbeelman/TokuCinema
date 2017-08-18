import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dev-card',
  templateUrl: './dev-card.component.html'
})
export class DevCardComponent implements OnInit {
  @Input() developer: {"name": string, "imgUrl": string, "bio": string, "url": string};

  constructor() { }

  ngOnInit() {
  }

}
