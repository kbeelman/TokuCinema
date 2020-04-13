import { DataType } from '../../../domain/Builder';
import { Movie } from '../../../domain/Movie';
import { MovieAlternateVersion } from '../../../domain/MovieAlternateVersion';
import { FirebaseService } from '../../../services/firebase.service';
import { MetatagService } from '../../../services/metatag.service';

import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Title, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html'
})
export class MoviedetailsComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public pageNotFound: boolean = false;

  movie: Movie;
  movieAlternateVersion: MovieAlternateVersion;
  moviesData: AngularFireList<any[]>;
  trailerUrl: SafeResourceUrl;
  private get pathname() { return document.location.pathname }

  constructor(
    @Inject(DomSanitizer) private sanitizer: DomSanitizer,
    private fdb: FirebaseService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metatagService: MetatagService,
  ) {
    this.sub = this.route.params.subscribe(params => {

      fdb.getItemFromBranch(this.pathname, 'movies', true, DataType.Movie).subscribe((data) => {
        this.movie = data;
        if (this.movie === undefined) {
          // redirect to 404
          this.pageNotFound = true;
        }
        this.trailerUrl = this.movie.Videos ? this.getTrustedUrl('https://www.youtube.com/embed/' + this.movie.Videos[0]) : undefined;
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
        }
      });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getTrustedUrl(sourceUrl: string): SafeResourceUrl {
    const safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sourceUrl);

    return safeUrl;
}
}
