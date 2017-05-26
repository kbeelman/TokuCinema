import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../css/app/home/styles/styles.css']
})
export class HomeComponent implements OnInit {
  landingPages: Array<{"text": string, "link": string}> = [
    {"text": 'Movies', "link": '/movies'},
    {"text": 'Media', "link": '/media'},
    {"text": 'About', "link": '/about'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
