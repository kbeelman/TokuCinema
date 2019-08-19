import { DataType } from '../../../domain/Builder';
import { Media } from '../../../domain/Media';
import { MediaDetails } from '../../../domain/MediaDetails';
import { MediaReview } from '../../../domain/MediaReview';
import { FirebaseService } from '../../../services/firebase.service';
import { MetatagService } from 'app/services/metatag.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireList  } from '@angular/fire/database';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mediadetails',
  templateUrl: './mediadetails.component.html'
})
export class MediadetailsComponent implements OnInit, OnDestroy {
  mediaData: AngularFireList<any[]>;
  media: Media;
  mediaDetails: MediaDetails;
  mediaReview: MediaReview;
  movieDetails: any = [];
  hasRuntimes: boolean = false;
  public pageNotFound: boolean = false;
  private path: string = '';
  private sub: Subscription;


 constructor(private fdb: FirebaseService,
      private router: Router,
      private route: ActivatedRoute,
      private titleService: Title,
      private metatagService: MetatagService
    ) {

    this.sub = this.route.params.subscribe(params => {
      this.path = params['name'];

        fdb.getItemFromBranch(this.router.url, 'media', true, DataType.Media).subscribe( (mediaData) => {
          this.media = mediaData;
          if (this.media === undefined) {
            // redirect to 404
            this.pageNotFound = true;
          }

          this.mediaDetails = this.media.GetMediaDetails();

          this.titleService.setTitle(this.mediaDetails.Title + ' ' + this.mediaDetails.Medium + ' - Toku Cinema');
          const imageAltTextTag = 'Image showing a movie poster for ' + this.mediaDetails.Title + ' ' + this.mediaDetails.Medium[0];
          const descriptionTag = this.mediaDetails.Title + ' ' + this.mediaDetails.Medium[0] + ' from ' +
          this.mediaDetails.Distributor + ' Information.';
          this.metatagService.updateTags([
            { property: 'og:url', content: 'https://tokucinema.com' + this.router.url },
            { property: 'og:title', content: this.mediaDetails.Title + ' ' + this.mediaDetails.Medium[0] + ' Information'},
            { property: 'og:description', content: descriptionTag },
            { name: 'description', content: descriptionTag },
            { property: 'og:image', content: this.mediaDetails.BoxArt[1] },
            { property: 'og:image:alt', content: imageAltTextTag },
            { name: 'twitter:image:alt', content: imageAltTextTag }
          ]);
          fdb.getImageMetadata(this.media.Path, 'media').subscribe((metadata) => {
            const customMetadata = metadata.customMetadata;
            if (customMetadata) {
              if (customMetadata.width && customMetadata.height) {
                this.metatagService.updateTags([
                  { property: 'og:image:width', content: customMetadata.width },
                  { property: 'og:image:height', content: customMetadata.height }
                ]);
              }
            }
          });

          this.mediaDetails.MovieDetails.forEach(element => {
            fdb.getItemFromBranch(element, 'movies', false, DataType.Movie).subscribe( (movieData) => {
              if (movieData) {
                let alreadyContainsMovie: boolean = false;
                this.movieDetails.forEach(existingMovies => {
                  if (existingMovies.Path === movieData['Path']) {
                    alreadyContainsMovie = true;
                  }
                })
                if (!alreadyContainsMovie) {
                  this.movieDetails.push(movieData);
                }
              }
            });

          });

          // Get the review object
          fdb.getItemFromBranch(this.media.Path, 'mediaReviews', false, DataType.MediaReview).subscribe( (mediaReviewData) => {
            this.mediaReview = mediaReviewData;
          });
        });
      });
    }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public doesHaveRuntimes(): boolean {
    this.movieDetails.forEach(item => {
      if (!(item.Runtime === undefined)) {
        this.hasRuntimes = true;
      }
    })

    return this.hasRuntimes;
  }
}
