import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();
  footerMessage: Array<string> = [];

  constructor() { }

  ngOnInit() {
    this.setFooterMessage();
  }

  private setFooterMessage(): void {
    this.footerMessage.push("All trademarks are the property of the respective trademark owners.");
    this.footerMessage.push("© TokuCinema " + this.year);
  }

}
