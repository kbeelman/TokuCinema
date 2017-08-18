import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// External Dependencies
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavComponent } from './nav/nav.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { MediaComponent } from './media/media.component';
import { MediaBoxsetsComponent } from './media-boxsets/media-boxsets.component';
import { MediadetailsComponent } from './mediadetails/mediadetails.component';
import { DevCardComponent } from './dev-card/dev-card.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MediaCardComponent } from './media-card/media-card.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { MediaFormComponent } from './media-form/media-form.component';
import { MediaSearchResultsComponent } from './media-search-results/media-search-results.component';
import { MoviesSearchResultsComponent } from './movies-search-results/movies-search-results.component';
import { SearchResultTabComponent } from './search-result-tab/search-result-tab.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MediaGalleryComponent } from './media-gallery/media-gallery.component';
import { FooterComponent } from './footer/footer.component';

// Pipes
import { MediaTitleSearch } from './pipes/media/mediaTitle.pipe';
import { MovieTitleSearch } from './pipes/movies/movieTitle.pipe';
import { MediaFiltersSearch } from './pipes/media/mediaFilters.pipe';
import { MovieFiltersSearch } from './pipes/movies/movieFilters.pipe';
import { DeepSearch } from './pipes/deepSearch.pipe';

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
    MediaFormComponent,
    MediaSearchResultsComponent,
    MoviesSearchResultsComponent,
    DeepSearch,
    SearchResultTabComponent,
    MediaBoxsetsComponent,
    NotFoundComponent,
    MediaGalleryComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      { path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
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
      // {
      //   path: 'media-form',
      //   component: MediaFormComponent
      // },
    ]),
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
