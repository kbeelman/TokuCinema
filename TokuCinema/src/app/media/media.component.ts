import { Component, OnInit } from '@angular/core';
import { Media } from '../../domain/Media';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DomainBuilder, DataType } from './../../domain/Builder';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit {
  mediaItems = new Array<Media>();
  searchTerm: string = '';

  mediaData: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) { 
    this.mediaData = db.list('/media');
  }

  ngOnInit() {
    this.mediaData.forEach(element => {
      for (var i = 0; i < element.length; i++) {
        let domainBuilder = new DomainBuilder(element[i], DataType.Media);
        let domainObject = domainBuilder.getDomainObject();
        this.mediaItems.push(domainObject);
      }
    });
  }

}
