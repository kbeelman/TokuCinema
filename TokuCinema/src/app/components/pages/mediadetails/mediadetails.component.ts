import { DataType } from '../../../domain/Builder';
import { Media } from '../../../domain/Media';
import { MediaDetails } from '../../../domain/MediaDetails';
import { MediaReview } from '../../../domain/MediaReview';
import { FirebaseService } from '../../../services/firebase.service';

import { Component, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { AngularFireList  } from '@angular/fire/database';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mediadetails',
  templateUrl: './mediadetails.component.html'
})
export class MediadetailsComponent implements OnChanges, OnInit, OnDestroy {
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
      private titleService: Title
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

          this.titleService.setTitle(this.mediaDetails.Title + ' ' + this.mediaDetails.Medium + ' - Toku Cinema');

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

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      let curVal  = JSON.stringify(change.currentValue);
	    let prevVal = JSON.stringify(change.previousValue);

      console.log(curVal);
      console.log(prevVal);
    }
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
