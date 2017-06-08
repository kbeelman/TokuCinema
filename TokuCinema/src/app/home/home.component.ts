import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  landingPages: Array<{"text": string, "link": string, "body": string}> = [
    {"text": 'Media', "link": '/media', 
      "body": 'Home media reviews capturing everything from video and audio quality to format and releasing studio.'},
    {"text": 'Movies', "link": '/movies', 
      "body": 'Reviews as well as objective data on all your favorite Tokusatsu films, including Godzilla, Mothra, and others.'},
    {"text": 'About', "link": '/about', 
      "body": 'Background on the goals of this site and information about its developers.'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
