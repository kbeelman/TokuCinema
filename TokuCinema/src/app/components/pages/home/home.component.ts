import { DataType } from '../../../domain/Builder';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from './../../../services/firebase.service';
import { Media } from '../../../domain/Media';
import { Component, OnInit } from '@angular/core';
import { DomainBuilder } from "../../../domain/Builder";

@Component({
  selector: 'app-home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public randomContent: Media;
  public landingPages: Array<{"text": string, "link": string, "body": string}> = [
    {"text": 'Movie List', "link": '/movies', 
      "body": 'Information on all of your favorite Tokusatsu, Giant Monster, and Sci-Fi films; including Godzilla, King Kong, and more.'},
    {"text": 'Home Media Releases', "link": '/media', 
      "body": 'Details on home media releases across a wide range of formats, as well as reviews capturing everything from video quality to special features.'}
  ]

  constructor(private fdb: FirebaseService) {}

  ngOnInit() {
    this.fdb.getBranch("media").subscribe((data) => {
      
      // Select a random index in the media branch to display in the content tile
      let winningNumber = Math.floor(Math.random() * data.length) + 0;
      
      let builder: DomainBuilder = new DomainBuilder(data[winningNumber], DataType.Media);
      this.randomContent = builder.getDomainObject();
      console.log(this.randomContent);
    });
  }

}
