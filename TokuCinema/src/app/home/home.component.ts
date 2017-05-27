import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  landingPages: Array<{"text": string, "link": string, "body": string}> = [
    {"text": 'Movies', "link": '/movies', 
      "body": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    {"text": 'Media', "link": '/media', 
      "body": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    {"text": 'About', "link": '/about', 
      "body": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
