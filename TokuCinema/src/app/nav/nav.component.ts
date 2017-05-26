import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../../css/app/nav/styles/styles.css']
})
export class NavComponent implements OnInit {
  navMenuOpen: boolean = false;
  searchOpen: boolean = false;
  menuItems: Array<{"text": string, "link": string}> = [
    {"text": 'Home', "link": '/home'},
    {"text": 'About', "link": '/about'},
    {"text": 'Movies', "link": '/movies'},
    {"text": 'Media', "link": '/media'}
  ];
  searchTerm: string = '';

  constructor() { }

  ngOnInit() {
  }

  private toggleNavMenu(): void {
    this.navMenuOpen = !this.navMenuOpen;
  }

  private toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
  }

}
