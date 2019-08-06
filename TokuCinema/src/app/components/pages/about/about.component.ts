import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  developers: Array<{'name': string, 'imgUrl': string, 'bio': string, 'url': string}> = [
    {
      name: 'Kiefer',
      imgUrl: 'https://firebasestorage.googleapis.com/v0/b/tokucinema.appspot.com/o/' +
        'images%2Fabout%2Fkiefer.png?alt=media&token=c35652cf-4eab-4597-8320-d1b6a0fd792f',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
        'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
        'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      url: 'https://www.linkedin.com/in/kbeelman/'
    },
    {
      name: 'Joey',
      imgUrl: 'https://firebasestorage.googleapis.com/v0/b/tokucinema.appspot.com/o/' +
        'images%2Fabout%2Fjoseph.png?alt=media&token=2054f594-d96c-4573-a285-abe24ec4caee',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
      'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
      'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      url: 'https://www.linkedin.com/in/josephwbayes/'
    }
  ];

  title = 'About - Toku Cinema';

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

}
