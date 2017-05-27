import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dev-card',
  templateUrl: './dev-card.component.html',
  styleUrls: ['./dev-card.component.css']
})
export class DevCardComponent implements OnInit {
  @Input() developer: {"name": string, "imgUrl": string, "bio": string};

  constructor() { }

  ngOnInit() {
  }

}
