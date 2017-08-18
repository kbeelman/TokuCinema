import { NotFoundComponent } from './not-found/not-found.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from './services/firebase.service';
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
import { MediaGalleryComponent } from './media-gallery/media-gallery.component';
import { FooterComponent } from './footer/footer.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Firebase config
import { environment } from '../environments/environment';

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
        SearchResultTabComponent,
        MediaGalleryComponent,
        FooterComponent,
        NotFoundComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
      ],
      providers: [FirebaseService]
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
