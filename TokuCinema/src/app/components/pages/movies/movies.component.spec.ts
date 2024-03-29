import { MovieCardComponent } from '../../sub-pages/movie-card/movie-card.component';
import { MovieTitleSearch } from '../../../pipes/movies/movieTitle.pipe';
import { MovieFiltersSearch } from '../../../pipes/movies/movieFilters.pipe';
import { MoviesSearchResultsComponent } from '../../sub-pages/movies-search-results/movies-search-results.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MoviesComponent } from './movies.component';
import { FirebaseService } from '../../../services/firebase.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MockFirebaseService } from '../../../services/mock.firebase.service';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MoviesComponent,
        MoviesSearchResultsComponent,
        MovieFiltersSearch,
        MovieTitleSearch,
        MovieCardComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireStorageModule
      ],
    }).overrideComponent(MoviesComponent,
      {
        set: {
          providers: [
            { provide: FirebaseService, useClass: MockFirebaseService },
          ]
        }
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle show filters', () => {
    component.showFiltersText = 'Show filters +';
    component.toggleShowFilters();
    expect(component.showFiltersText).toEqual('Hide filters -');
    component.toggleShowFilters();
    expect(component.showFiltersText).toEqual('Show filters +');
  });

  it('should clear filters', () => {
    component.directorFilter = 'test';
    component.distributorFilter = 'test';
    component.eraFilter = 'test';
    component.productionCompanyFilter = 'test';
    component.seriesFilter = 'test';
    component.spokenLanguageFilter = 'English';

    component.clearFilters();

    expect(component.directorFilter).toEqual('');
    expect(component.distributorFilter).toEqual('');
    expect(component.eraFilter).toEqual('');
    expect(component.productionCompanyFilter).toEqual('');
    expect(component.seriesFilter).toEqual('');
    expect(component.spokenLanguageFilter).toEqual('');
  });
});
