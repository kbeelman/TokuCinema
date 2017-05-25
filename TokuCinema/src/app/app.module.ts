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
    AboutComponent
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
      }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
