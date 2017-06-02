import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Media } from '../../domain/Media';
import { MediaDetails } from '../../domain/MediaDetails';
import { DomainBuilder, DataType } from './../../domain/Builder';
import { StringCleaner, StringType } from './../../domain/StringCleaner';

@Component({
  selector: 'app-mediadetails',
  templateUrl: './mediadetails.component.html'
})
export class MediadetailsComponent implements OnInit {
    mediaData: FirebaseListObservable<any[]>;
    media: Media;
    mediaDetails: MediaDetails;

    dataLoaded: boolean = false;

 constructor(db: AngularFireDatabase,
      private router: Router,
      private location: Location,
    ) { 
    
    router.events.subscribe((val) => {

      if(this.router.url.split('/')[1] === 'media' && this.router.url.split('/')[2]){
        let Path = new StringCleaner(this.router.url, StringType.WithRoute).getCleanString();
        this.mediaData = db.list('/media',
        {
          query: {
            orderByChild: 'Path',
            equalTo: Path
          }
        });

        this.mediaData.forEach(element => {
          let domainBuilder = new DomainBuilder(element[0], DataType.Media);
          let domainObject = domainBuilder.getDomainObject();
          this.media = domainObject;
          this.mediaDetails = this.media.GetMediaDetails();
        }) 
      }
    });
  }

  ngOnInit() {

  }

}
