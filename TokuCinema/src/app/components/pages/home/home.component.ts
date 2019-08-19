import { DataType, DomainBuilder } from '../../../domain/Builder';
import { Media } from '../../../domain/Media';
import { FirebaseService } from './../../../services/firebase.service';
import { MetatagService } from './../../../services/metatag.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'Toku Cinema';
  private sub: Subscription;
  public randomContent: Media;
  public landingPages: Array<{'text': string, 'link': string, 'body': string}> = [
    {'text': 'Movie List', 'link': '/movies',
      'body': 'Information on all of your favorite Tokusatsu, Giant Monster, and Sci-Fi films; including Godzilla, King Kong, and more.'},
    {'text': 'Home Media Releases', 'link': '/media',
      'body': 'Details on home media releases across a wide range of formats, ' +
        'as well as reviews capturing everything from video quality to special features.'}
  ]

  constructor(
    private fdb: FirebaseService,
    private titleService: Title,
    private metatagService: MetatagService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    const descriptionTag = 'Toku Cinema is a website dedicated to tokusatsu (a Japanese term meaning ' +
    '\"special effects\") cinema and television, as well as media influenced by tokusatsu, and media that provided ' +
    'influence to the tokusatsu genre.';
    this.metatagService.updateTags([
      { property: 'og:url', content: 'https://tokucinema.com' },
      { property: 'og:title', content: 'Toku Cinema'},
      { property: 'og:description', content: descriptionTag },
      { name: 'description', content: descriptionTag },
      { property: 'og:image', content: '' }
    ]);
    this.sub = this.fdb.getBranch('media').subscribe((data) => {

      // Select a random index in the media branch to display in the content tile
      const winningNumber = Math.floor(Math.random() * data.length) + 0;

      const builder: DomainBuilder = new DomainBuilder(data[winningNumber], DataType.Media);
      this.randomContent = builder.getDomainObject();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
