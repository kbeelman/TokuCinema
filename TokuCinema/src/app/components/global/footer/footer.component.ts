import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent {
  year = new Date().getFullYear();
  aboutLink: string = '/about';

  constructor() { }

}
