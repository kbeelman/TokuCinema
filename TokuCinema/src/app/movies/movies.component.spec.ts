import { MovieCardComponent } from './../movie-card/movie-card.component';
import { MovieTitleSearch } from './../pipes/movies/movieTitle.pipe';
import { MovieFiltersSearch } from './../pipes/movies/movieFilters.pipe';
import { MoviesSearchResultsComponent } from './../movies-search-results/movies-search-results.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MoviesComponent } from './movies.component';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesComponent,
      MoviesSearchResultsComponent,
      MovieFiltersSearch,
      MovieTitleSearch,
      MovieCardComponent
    ],
      imports: [
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule 
      ]
    })
    .compileComponents();
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
    component.showFilters = 'Show filters +';
    component.toggleShowFilters();
    expect(component.showFilters).toEqual('Hide filters -');
    component.toggleShowFilters();
    expect(component.showFilters).toEqual('Show filters +');
  });

  it('should clear filters', () => {
    component.directorFilter = 'test';
    component.distributorFilter = 'test';
    component.eraFilter = 'test';
    component.productionCompanyFilter = 'test';
    component.seriesFilter = 'test';
    component.spokenLanguageFilter = 'test';

    component.clearFilters();

    expect(component.directorFilter).toEqual('');
    expect(component.distributorFilter).toEqual('');
    expect(component.eraFilter).toEqual('');
    expect(component.productionCompanyFilter).toEqual('');
    expect(component.seriesFilter).toEqual('');
    expect(component.spokenLanguageFilter).toEqual('');
  });
});
