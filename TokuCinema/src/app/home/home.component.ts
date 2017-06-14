import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  landingPages: Array<{"text": string, "link": string, "body": string}> = [
    {"text": 'Movie List', "link": '/movies', 
      "body": 'Information all your favorite Tokusatsu, Giant Monster, and Sci-Fi films; including Godzilla, Gamera, and others.'},
    {"text": 'Home Media Releases', "link": '/media', 
      "body": 'Information across wide range of home media formats as well as reviews capturing everything from video and audio quality to special features.'},
    {"text": 'About', "link": '/about', 
      "body": 'Background on the goals of this site and information about its developers.'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
