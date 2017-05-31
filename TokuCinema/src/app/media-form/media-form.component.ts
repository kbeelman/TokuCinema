import { Media } from './../../domain/Media';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-media-form',
  templateUrl: './media-form.component.html'
})
export class MediaFormComponent implements OnInit {
  media: FirebaseListObservable<any[]>; 

  constructor(db: AngularFireDatabase) { 
    this.media = db.list('/media');
  }

  ngOnInit() {
  }

}
