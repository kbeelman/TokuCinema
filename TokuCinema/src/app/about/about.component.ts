import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../../css/app/about/styles/styles.css']
})
export class AboutComponent implements OnInit {
  developers: Array<{"name": string, "imgUrl": string, "bio": string}> = [
    {
      name: "Kiefer",
      imgUrl: "http://placehold.it/250x150",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      name: "Joey",
      imgUrl: "http://placehold.it/250x150",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
