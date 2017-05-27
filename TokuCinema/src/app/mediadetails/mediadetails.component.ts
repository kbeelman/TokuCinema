import { Component, OnInit } from '@angular/core';
import { MediaDetails } from '../../domain/MediaDetails';

@Component({
  selector: 'app-mediadetails',
  templateUrl: './mediadetails.component.html'
})
export class MediadetailsComponent implements OnInit {
  // landingPages: Array<{"text": string, "link": string, "body": string}> = [
  //   {"text": 'Movies', "link": '/movies', 
  //     "body": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
  //   {"text": 'Media', "link": '/media', 
  //     "body": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
  //   {"text": 'About', "link": '/about', 
  //     "body": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..'}
  // ]

  //mainFeatureInfo: Array<{"details": string[]}> = [{"details": ["stuff", ""]}]

  constructor() { }

  ngOnInit() {
  }

}
