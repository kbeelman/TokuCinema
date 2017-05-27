import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

// External Dependencies
import { AngularFireModule } from 'angularfire2';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavComponent } from './nav/nav.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { MediaComponent } from './media/media.component';
import { MediadetailsComponent } from './mediadetails/mediadetails.component';
import { DevCardComponent } from './dev-card/dev-card.component';

export const firebaseConfig = {
    apiKey: "AIzaSyDlWyJc3dHgXcyQ2lsSDfMYWZ4SADS_HIE",
    authDomain: "tokucinema.firebaseapp.com",
    databaseURL: "https://tokucinema.firebaseio.com",
    projectId: "tokucinema",
    storageBucket: "tokucinema.appspot.com",
    messagingSenderId: "835457714346"
};

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
    DevCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
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
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
