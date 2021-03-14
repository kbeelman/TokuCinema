import { DataType } from '../../../domain/Builder';
import { Movie } from '../../../domain/Movie';
import { MovieAlternateVersion } from '../../../domain/MovieAlternateVersion';
import { FirebaseService } from '../../../services/firebase.service';
import { MetatagService } from '../../../services/metatag.service';

import { Component, OnDestroy, Inject } from '@angular/core';
import { Title, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Media } from '../../../domain/Media';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html'
})
export class MoviedetailsComponent implements OnDestroy {
  public pageNotFound: boolean = false;
  movie: Movie;
  movieAlternateVersion: MovieAlternateVersion;
  mediaItems = new Array<Media>();
  trailerUrl: SafeResourceUrl;

  private sub: Subscription;
  private get pathname() {
    return document.location.pathname;
  }

  constructor(
    @Inject(DomSanitizer) private sanitizer: DomSanitizer,
    private fdb: FirebaseService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metatagService: MetatagService,
  ) {
    this.sub = this.route.params.subscribe(() => {

      this.fdb.getItemFromBranch(this.pathname, 'movies', true, DataType.Movie).subscribe((data: Movie) => {
        this.movie = data;
        if (this.movie === undefined) {
          // redirect to 404
          this.pageNotFound = true;
        }
        this.trailerUrl = this.movie.Videos ? this.getTrustedUrl('https://www.youtube.com/embed/' + this.movie.Videos[0]) : '';
        this.titleService.setTitle(this.movie.OfficialTitle + ' (' + this.movie.ReleaseYear + ') - Toku Cinema');
        const imageAltTextTag = 'Image showing a movie poster for ' + this.movie.OfficialTitle + ' (' + this.movie.ReleaseYear + ')';
        const descriptionTag = 'Details about ' + this.movie.OfficialTitle + ' (' + this.movie.ReleaseYear + ').';
        const imageUrlTag = this.movie.doesPosterExist() ? this.movie.OriginalPoster[1] : '';
        this.metatagService.updateTags([
          { property: 'og:url', content: 'https://tokucinema.com' + this.pathname },
          { property: 'og:title', content: this.movie.OfficialTitle },
          { property: 'og:description', content: descriptionTag },
          { name: 'description', content: descriptionTag },
          { property: 'og:image', content: imageUrlTag }
        ]);
        if (this.movie.doesPosterExist()) {
          this.fdb.getImageMetadata(this.movie.Path, 'movies').then((metadata) => {
            const customMetadata = metadata.customMetadata;
            if (customMetadata && customMetadata.width && customMetadata.height) {
              this.metatagService.updateTags([
                { property: 'og:image:width', content: customMetadata.width },
                { property: 'og:image:height', content: customMetadata.height },
                { property: 'og:image:alt', content: imageAltTextTag },
                { name: 'twitter:image:alt', content: imageAltTextTag }
              ]);
            }
          });
        }
      });

      this.fdb.getItemFromBranch(this.pathname, 'alternateVersions', true, DataType.MovieAlternateVersion)
        .subscribe((data: MovieAlternateVersion) => {
          if (data) {
            this.movieAlternateVersion = data;
            this.movieAlternateVersion.Countries[0].Active = true;
          }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private getTrustedUrl(sourceUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(sourceUrl);
  }
}
