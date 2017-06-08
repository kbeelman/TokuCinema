import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MovieFiltersSearch } from './../pipes/movies/movieFilters.pipe';
import { MovieTitleSearch } from './../pipes/movies/movieTitle.pipe';
import { MovieCardComponent } from './../movie-card/movie-card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesSearchResultsComponent } from './movies-search-results.component';

describe('MoviesSearchResultsComponent', () => {
  let component: MoviesSearchResultsComponent;
  let fixture: ComponentFixture<MoviesSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesSearchResultsComponent,
        MovieCardComponent,
        MovieTitleSearch,
        MovieFiltersSearch 
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
