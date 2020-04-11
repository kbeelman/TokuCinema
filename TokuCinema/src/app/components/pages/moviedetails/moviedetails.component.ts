import { DataType } from '../../../domain/Builder';
import { Movie } from '../../../domain/Movie';
import { MovieAlternateVersion } from '../../../domain/MovieAlternateVersion';
import { FirebaseService } from '../../../services/firebase.service';
import { MetatagService } from '../../../services/metatag.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html'
})
export class MoviedetailsComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public pageNotFound: boolean = false;
  public activeAltCountry: any; // used for mobile alt version selector

  movie: Movie;
  movieAlternateVersion: MovieAlternateVersion;
  moviesData: AngularFireList<any[]>;
  private get pathname() { return document.location.pathname }

  constructor(
    private fdb: FirebaseService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metatagService: MetatagService
  ) {
    this.sub = this.route.params.subscribe(params => {

      fdb.getItemFromBranch(this.pathname, 'movies', true, DataType.Movie).subscribe((data) => {
        this.movie = data;
        if (this.movie === undefined) {
          // redirect to 404
          this.pageNotFound = true;
        }
        this.titleService.setTitle(this.movie.OfficialTitle + ' (' + this.movie.ReleaseYear + ') - Toku Cinema');
        const imageAltTextTag = 'Image showing a movie poster for ' + this.movie.OfficialTitle + ' (' + this.movie.ReleaseYear + ')';
        const descriptionTag = 'Details about ' + this.movie.OfficialTitle + ' (' + this.movie.ReleaseYear + ').'
        const imageUrlTag = this.movie.doesPosterExist() ? this.movie.OriginalPoster[1] : '';
        this.metatagService.updateTags([
          { property: 'og:url', content: 'https://tokucinema.com' + this.pathname },
          { property: 'og:title', content: this.movie.OfficialTitle },
          { property: 'og:description', content: descriptionTag },
          { name: 'description', content: descriptionTag },
          { property: 'og:image', content: imageUrlTag }
        ]);
        if (this.movie.doesPosterExist()) {
          fdb.getImageMetadata(this.movie.Path, 'movies').then((metadata) => {
            const customMetadata = metadata.customMetadata;
            if (customMetadata) {
              if (customMetadata.width && customMetadata.height) {
                this.metatagService.updateTags([
                  { property: 'og:image:width', content: customMetadata.width },
                  { property: 'og:image:height', content: customMetadata.height },
                  { property: 'og:image:alt', content: imageAltTextTag },
                  { name: 'twitter:image:alt', content: imageAltTextTag }
                ]);
              }
            }
          });
        }
      });

      fdb.getItemFromBranch(this.pathname, 'alternateVersions', true, DataType.MovieAlternateVersion).subscribe((data) => {
        if (data) {
          this.movieAlternateVersion = data;
          this.movieAlternateVersion.Countries[0].Active = true;
          this.activeAltCountry = this.movieAlternateVersion.Countries[0].Country;
        }
      });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
