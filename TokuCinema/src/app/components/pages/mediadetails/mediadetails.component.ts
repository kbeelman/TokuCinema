import { MediaGalleryComponent } from '../../../components/sub-pages/media-gallery/media-gallery.component';
import { DataType } from '../../../domain/Builder';
import { Media } from '../../../domain/Media';
import { MediaDetails } from '../../../domain/MediaDetails';
import { MediaReview } from '../../../domain/MediaReview';
import { Movie } from '../../../domain/Movie';
import { FirebaseService } from '../../../services/firebase.service';
import { MetatagService } from '../../../services/metatag.service';

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mediadetails',
  templateUrl: './mediadetails.component.html'
})
export class MediadetailsComponent implements OnInit, OnDestroy {
  @ViewChild('mediaGallery') public mediaGallery: MediaGalleryComponent;
  media: Media;
  mediaDetails: MediaDetails;
  mediaReview: MediaReview;
  movieDetails: Movie[] = [];
  hasRuntimes: boolean = false;
  coverUrl: string = '';
  imageGallery: Array<{'Screencap': string; 'Thumbnail': string; 'Description': string; 'Name': string}> = [];
  videoGallery: Array<{'Host': string; 'ID': string; 'Description': string}> = [];
  public pageNotFound = false;
  private sub: Subscription = new Subscription();

  private get pathname() {
    return document.location.pathname;
  }

  constructor(private fdb: FirebaseService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metatagService: MetatagService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(() => {
      this.fdb.getItemFromBranch(this.pathname, 'media', true, DataType.Media).subscribe((mediaData) => {
        this.media = mediaData;
        if (this.media === undefined) {
          // redirect to 404
          this.pageNotFound = true;
        }

        this.mediaDetails = this.media.GetMediaDetails();

        this.setMetaTags();
        this.subscribeToMediaDetails();
        this.subscribeToReview();
        this.imageGallery = this.fdb.getImages('media', this.media.Path, this.mediaDetails.ScreencapDescriptions);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * @description Gathers the information for the MediaDetails.
   */
  subscribeToMediaDetails(): void {
    this.mediaDetails.MovieDetails.forEach((element: string) => {
      this.fdb.getItemFromBranch(element, 'movies', false, DataType.Movie).subscribe((movieData) => {
        if (movieData) {
          let alreadyContainsMovie: boolean = false;
          this.movieDetails.forEach((existingMovies: Movie) => {
            if (existingMovies.Path === movieData.Path) {
              alreadyContainsMovie = true;
            }
          });
          if (!alreadyContainsMovie) {
            this.movieDetails.push(movieData);
          }
        }
      });
    });
  }

  /**
   * @description Gathers the information for the review object.
   */
  subscribeToReview(): void {
    this.fdb.getItemFromBranch(this.media.Path, 'mediaReviews', false, DataType.MediaReview).subscribe((mediaReviewData) => {
      this.mediaReview = mediaReviewData;
    });
  }

  /**
   * @description Sets the page title and meta tags.
   */
  setMetaTags(): void {
    this.titleService.setTitle(this.mediaDetails.Title + ' ' + this.mediaDetails.Medium + ' - Toku Cinema');
    const imageAltTextTag = 'Image showing a movie poster for ' + this.mediaDetails.Title + ' ' + this.mediaDetails.getFirstMedium();
    const descriptionTag = this.mediaDetails.Title + ' ' + this.mediaDetails.getFirstMedium() + ' from ' +
      this.mediaDetails.Distributor + ' Information.';
    this.metatagService.updateTags([
      { property: 'og:url', content: 'https://tokucinema.com' + this.pathname },
      { property: 'og:title', content: this.mediaDetails.Title + ' ' + this.mediaDetails.getFirstMedium() + ' Information' },
      { property: 'og:description', content: descriptionTag },
      { name: 'description', content: descriptionTag },
      { property: 'og:image', content: this.mediaDetails.BoxArt[1] },
      { property: 'og:image:alt', content: imageAltTextTag },
      { name: 'twitter:image:alt', content: imageAltTextTag }
    ]);
    this.fdb.getImageMetadata(this.media.Path, 'media').then((metadata) => {
      const customMetadata = metadata.customMetadata;
      if (customMetadata && customMetadata.width && customMetadata.height) {
        this.metatagService.updateTags([
          { property: 'og:image:width', content: customMetadata.width },
          { property: 'og:image:height', content: customMetadata.height }
        ]);
      }
    });
  }

  /**
   * @description Checks if any of the movies in this media contain runtimes.
   * @returns {boolean} Whether or not any movies in this Media contains runtimes.
   */
  public doesHaveRuntimes(): boolean {
    this.movieDetails.forEach(item => {
      if (item.Runtime !== undefined) {
        this.hasRuntimes = true;
      }
    });

    return this.hasRuntimes;
  }

  /**
   *
   *
   * @description Safely retrieves the featured screen cap at the given index
   * @returns {string} Returns the featured screen cap when available, otherwise an empty string
   * @param {number} index featured screen cap to retrieve
   */
  public getFeaturedScreenCapAtIndex(index: number): string {
    let screenCap = '';

    if (this.imageGallery &&
      this.imageGallery.length > index &&
      this.mediaReview &&
      this.mediaReview.FeaturedScreenShots &&
      this.mediaReview.FeaturedScreenShots.length > index) {
      screenCap = this.imageGallery[this.mediaReview.FeaturedScreenShots[index]].Screencap;
    }

    return screenCap;
  }

  public openGallery(url: string): void {
    this.mediaGallery.showItem = true;
    this.mediaGallery.setActiveItemFromUrl(url);
  }
}
