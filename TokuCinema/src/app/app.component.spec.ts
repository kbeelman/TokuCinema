import { RouterTestingModule }   from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MediadetailsComponent } from './mediadetails/mediadetails.component';
import { MediaComponent } from './media/media.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { AboutComponent } from './about/about.component';
import { NavComponent } from './nav/nav.component';
import { TestBed, async } from '@angular/core/testing';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyDlWyJc3dHgXcyQ2lsSDfMYWZ4SADS_HIE",
    authDomain: "tokucinema.firebaseapp.com",
    databaseURL: "https://tokucinema.firebaseio.com",
    projectId: "tokucinema",
    storageBucket: "tokucinema.appspot.com",
    messagingSenderId: "835457714346"
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        NavComponent,
        AboutComponent,
        MoviesComponent,
        MoviedetailsComponent,
        MediaComponent,
        MediadetailsComponent
      ],
      imports: [ FormsModule, RouterTestingModule, AngularFireModule.initializeApp(firebaseConfig) ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
