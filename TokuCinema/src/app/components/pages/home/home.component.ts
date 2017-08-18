import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  landingPages: Array<{"text": string, "link": string, "body": string}> = [
    {"text": 'Movie List', "link": '/movies', 
      "body": 'Information on all of your favorite Tokusatsu, Giant Monster, and Sci-Fi films; including Godzilla, King Kong, and more.'},
    {"text": 'Home Media Releases', "link": '/media', 
      "body": 'Details on home media releases across a wide range of formats, as well as reviews capturing everything from video quality to special features.'},
    {"text": 'About', "link": '/about', 
      "body": 'Background on the goals of this site and information about its developers.'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
