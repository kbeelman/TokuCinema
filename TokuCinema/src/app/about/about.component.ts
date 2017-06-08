import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  developers: Array<{"name": string, "imgUrl": string, "bio": string, "url": string}> = [
    {
      name: "Kiefer",
      imgUrl: "http://placehold.it/250x150",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      url: "https://www.linkedin.com/in/kbeelman/"
    },
    {
      name: "Joey",
      imgUrl: "http://placehold.it/250x150",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      url: "https://www.linkedin.com/in/josephwbayes/"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
