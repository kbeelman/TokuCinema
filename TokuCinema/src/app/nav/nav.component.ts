import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
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

  toggleNavMenu(): void {
    this.navMenuOpen = !this.navMenuOpen;
  }

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
  }

  closeNav(): void {
    this.navMenuOpen = false;
    this.searchOpen = false;
  }

}
