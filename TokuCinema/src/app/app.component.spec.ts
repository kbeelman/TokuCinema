import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCardComponent } from './media-card/media-card.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieFiltersSearch } from './pipes/movies/movieFilters.pipe';
import { MediaFiltersSearch } from './pipes/media/mediaFilters.pipe';
import { MediaTitleSearch } from './pipes/media/mediaTitle.pipe';
import { MovieTitleSearch } from './pipes/movies/movieTitle.pipe';
import { DeepSearch } from './pipes/deepSearch.pipe';
import { MediaSearchResultsComponent } from './media-search-results/media-search-results.component';
import { MoviesSearchResultsComponent } from './movies-search-results/movies-search-results.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { DevCardComponent } from './dev-card/dev-card.component';
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
import { SearchResultTabComponent } from './search-result-tab/search-result-tab.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
    apiKey: "AIzaSyDlWyJc3dHgXcyQ2lsSDfMYWZ4SADS_HIE",
    authDomain: "tokucinema.firebaseapp.com",
    databaseURL: "https://tokucinema.firebaseio.com",
    projectId: "tokucinema",
    storageBucket: "tokucinema.appspot.com",
    messagingSenderId: "835457714346"
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

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
        MediadetailsComponent,
        DevCardComponent,
        SearchResultsComponent,
        MoviesSearchResultsComponent,
        MediaSearchResultsComponent,
        DeepSearch,
        MovieTitleSearch,
        MediaTitleSearch,
        MediaFiltersSearch,
        MovieFiltersSearch,
        MovieCardComponent,
        MediaCardComponent,
        SearchResultTabComponent
      ],
      imports: [ 
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule, 
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {    
    expect(component).toBeTruthy();
  }));

});
