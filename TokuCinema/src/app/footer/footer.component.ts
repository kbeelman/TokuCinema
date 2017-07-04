import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();
  footerMessage: string = "&copy;TokuCinema " + this.year;

  constructor() { }

  ngOnInit() {
  }

}
