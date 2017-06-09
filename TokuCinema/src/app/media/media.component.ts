import { MediaFilterPakage } from './../../domain/MediaFilterPackage';
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
  mediumFilter: string = '';
  spokenLanguageFilter: string = '';
  subtitleLanguageFilter: string = '';
  countryFilter: string = '';
  regionFilter: any = '';
  mediaData: FirebaseListObservable<any[]>;
  showFilters: string = "Show filters +";

  // Form use
  mediums: Array<string> = [
    "Blu-ray",
    "DVD",
    "Laser Disc",
    "VHS"
  ];

  languages: Array<string> = [
    "English",
    "Japanese",
    "German",
    "French",
    "Italian"
  ];

  countries: Array<string> = [
    "Japan",
    "United States"
  ];

  regions: Array<number> = [
    1, 2, 3, 4
  ];

  constructor(db: AngularFireDatabase) { 
    this.mediaData = db.list('/media');
  }

  ngOnInit() {
    this.mediaData.forEach(element => {
      for (var i = 0; i < element.length; i++) {
        let domainBuilder = new DomainBuilder(element[i], DataType.Media);
        let domainObject = domainBuilder.getDomainObject();
        this.mediaItems.push(domainObject);
        console.log(domainObject);
      }
    });
  }

  public toggleShowFilters(): void {
    if(this.showFilters === 'Show filters +') {
      this.showFilters = 'Hide filters -';
    } else {
      this.showFilters = 'Show filters +';
    }
  }

  public clearFilters(): void {
    this.countryFilter = '';
    this.mediumFilter = '';
    this.regionFilter = '';
    this.spokenLanguageFilter = '';
    this.subtitleLanguageFilter = '';
  }

}
