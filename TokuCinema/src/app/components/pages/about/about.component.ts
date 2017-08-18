import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  developers: Array<{"name": string, "imgUrl": string, "bio": string, "url": string}> = [
    {
      name: "Kiefer",
      imgUrl: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/071/233/0cdb71d.jpg",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      url: "https://www.linkedin.com/in/kbeelman/"
    },
    {
      name: "Joey",
      imgUrl: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAX9AAAAJDQwYmRlODdjLTc2MTEtNDNmNS04OGEyLTJhZjQxNGM3MjJmMg.jpg",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      url: "https://www.linkedin.com/in/josephwbayes/"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
