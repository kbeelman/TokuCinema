import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from './services/firebase.service';
import { MediaCardComponent } from './components/sub-pages/media-card/media-card.component';
import { MovieCardComponent } from './components/sub-pages/movie-card/movie-card.component';
import { MovieFiltersSearch } from './pipes/movies/movieFilters.pipe';
import { MediaFiltersSearch } from './pipes/media/mediaFilters.pipe';
import { MediaTitleSearch } from './pipes/media/mediaTitle.pipe';
import { MovieTitleSearch } from './pipes/movies/movieTitle.pipe';
import { DeepSearch } from './pipes/deepSearch.pipe';
import { MediaSearchResultsComponent } from './components/sub-pages/media-search-results/media-search-results.component';
import { MoviesSearchResultsComponent } from './components/sub-pages/movies-search-results/movies-search-results.component';
import { SearchResultsComponent } from './components/sub-pages/search-results/search-results.component';
import { DevCardComponent } from './components/sub-pages/dev-card/dev-card.component';
import { RouterTestingModule }   from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MediadetailsComponent } from './components/pages/mediadetails/mediadetails.component';
import { MediaComponent } from './components/pages/media/media.component';
import { MoviesComponent } from './components/pages/movies/movies.component';
import { MoviedetailsComponent } from './components/pages/moviedetails/moviedetails.component';
import { AboutComponent } from './components/pages/about/about.component';
import { NavComponent } from './components/global/nav/nav.component';
import { SearchResultTabComponent } from './components/sub-pages/search-result-tab/search-result-tab.component';
import { MediaGalleryComponent } from './components/sub-pages/media-gallery/media-gallery.component';
import { FooterComponent } from './components/global/footer/footer.component';

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
