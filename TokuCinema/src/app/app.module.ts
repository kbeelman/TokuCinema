import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// External Dependencies
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { NavComponent } from './components/global/nav/nav.component';
import { MoviesComponent } from './components/pages/movies/movies.component';
import { MoviedetailsComponent } from './components/pages/moviedetails/moviedetails.component';
import { MediaComponent } from './components/pages/media/media.component';
import { MediaBoxsetsComponent } from './components/sub-pages/media-boxsets/media-boxsets.component';
import { MediadetailsComponent } from './components/pages/mediadetails/mediadetails.component';
import { DevCardComponent } from './components/sub-pages/dev-card/dev-card.component';
import { MovieCardComponent } from './components/sub-pages/movie-card/movie-card.component';
import { MediaCardComponent } from './components/sub-pages/media-card/media-card.component';
import { SearchResultsComponent } from './components/sub-pages/search-results/search-results.component';
import { MediaSearchResultsComponent } from './components/sub-pages/media-search-results/media-search-results.component';
import { MoviesSearchResultsComponent } from './components/sub-pages/movies-search-results/movies-search-results.component';
import { SearchResultTabComponent } from './components/sub-pages/search-result-tab/search-result-tab.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { MediaGalleryComponent } from './components/sub-pages/media-gallery/media-gallery.component';
import { FooterComponent } from './components/global/footer/footer.component';

// Pipes
import { MediaTitleSearch } from './pipes/media/mediaTitle.pipe';
import { MovieTitleSearch } from './pipes/movies/movieTitle.pipe';
import { MediaFiltersSearch } from './pipes/media/mediaFilters.pipe';
import { MovieFiltersSearch } from './pipes/movies/movieFilters.pipe';
import { DeepSearch } from './pipes/deepSearch.pipe';
import { ReleaseYearSortPipe } from './pipes/release-year-sort.pipe';

// Services
import { FirebaseService } from './services/firebase.service';

// Firebase config
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavComponent,
    MoviesComponent,
    MoviedetailsComponent,
    MediaComponent,
    MediadetailsComponent,
    DevCardComponent,
    MovieCardComponent,
    MediaCardComponent,
    SearchResultsComponent,
    MediaTitleSearch,
    MovieTitleSearch,
    MediaFiltersSearch,
    MovieFiltersSearch,
    MediaSearchResultsComponent,
    MoviesSearchResultsComponent,
    DeepSearch,
    SearchResultTabComponent,
    MediaBoxsetsComponent,
    NotFoundComponent,
    MediaGalleryComponent,
    FooterComponent,
    ReleaseYearSortPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'movies',
        component: MoviesComponent
      },
      {
        path: 'movies/:name',
        component: MoviedetailsComponent
      },
      {
        path: 'media',
        component: MediaComponent
      },
      {
        path: 'media/:name',
        component: MediadetailsComponent
      },
      {
        path: 'mediaboxsets',
        component: MediaBoxsetsComponent
      },
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]),
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
