import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import "rxjs/add/operator/takeWhile";
import { AngularFireList  } from '@angular/fire/database';
import { FirebaseService } from '../../../services/firebase.service';
import { Media } from '../../../domain/Media';
import { MediaDetails } from '../../../domain/MediaDetails';
import { MediaReview } from '../../../domain/MediaReview';
import { DataType } from '../../../domain/Builder';

import 'rxjs-compat';

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
  private alive: boolean = true;
  private path: string = '';
  private sub: any;


 constructor(private fdb: FirebaseService,
      private router: Router,
      private location: Location,
      private route: ActivatedRoute
    ) {

    this.sub = this.route.params.subscribe(params => {
      this.path = params["name"];

        fdb.getItemFromBranch(this.router.url, 'media', true, DataType.Media).subscribe( (data) => {
          this.media = data;
          if (this.media === undefined) {
            // redirect to 404
            this.pageNotFound = true;
          }

          this.mediaDetails = this.media.GetMediaDetails();

          this.mediaDetails.MovieDetails.forEach(element => {
            fdb.getItemFromBranch(element, 'movies', false, DataType.Movie).subscribe( (data) => {
              if (data)
              {
                let alreadyContainsMovie: boolean = false;
                this.movieDetails.forEach(existingMovies => {
                  if(existingMovies.Path === data["Path"]) {
                    alreadyContainsMovie = true;
                  }
                })
                if (!alreadyContainsMovie) {
                  this.movieDetails.push(data);
                }
              }
            });

          });

          // Get the review object
          fdb.getItemFromBranch(this.media.Path, 'mediaReviews', false, DataType.MediaReview).subscribe( (data) => {
            this.mediaReview = data;
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
      if(!(item.Runtime === undefined)) {
        this.hasRuntimes = true;
      }
    })

    return this.hasRuntimes;
  }
}
