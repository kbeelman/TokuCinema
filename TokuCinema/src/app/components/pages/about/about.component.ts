import { MetatagService } from 'app/services/metatag.service';

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
      bio: 'Kiefer has been a fan of Godzilla since 1998 when he first saw GODZILLA, KING OF THE MONSTERS! (1956). ' +
      'Over the next decade, he became a fan of home video and the Tokusatsu genre as a whole, with the help of home ' +
      'video releases from ADV and Media Blasters. Over the years, Kiefer has repeadedly come accross questions relating ' +
      'to what the special features of a partiular DVD are, or what version of a movie was included on a Blu-ray, ' +
      'so he has striven to collect this information in a singular and accessible location, which has manifested itself as ' +
      'Toku Cinema. Kiefer helps with the software development and content generation of the Toku Cinema website.',
      url: 'https://www.linkedin.com/in/kbeelman/'
    },
    {
      name: 'Joey',
      imgUrl: 'https://firebasestorage.googleapis.com/v0/b/tokucinema.appspot.com/o/' +
        'images%2Fabout%2Fjoey.jpg?alt=media&token=d7e8856e-e364-4d2a-b919-4e6927cbab56',
      bio: 'Joey has been a fan of the Godzilla series since childhood, and was helped by his grandfather who would record ' +
      'TV airings of Godzilla movies onto VHS tapes. As a skilled Software Engineer, Joey lends his talents to assisting with the ' +
      'software development of the Toku Cinema website.',
      url: 'https://www.linkedin.com/in/josephwbayes/'
    }
  ];

  title = 'About - Toku Cinema';

  constructor(
    private metatagService: MetatagService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    const descriptionTag = 'About the developers of the Toku Cinema website.';
    this.metatagService.updateTags([
      { property: 'og:url', content: 'https://tokucinema.com/about' },
      { property: 'og:title', content: 'About - Toku Cinema'},
      { property: 'og:description', content: descriptionTag },
      { name: 'description', content: descriptionTag },
      { property: 'og:image', content: '' }
    ]);
  }

}
