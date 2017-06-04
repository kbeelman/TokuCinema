import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesSearchResultsComponent } from './movies-search-results.component';

describe('MoviesSearchResultsComponent', () => {
  let component: MoviesSearchResultsComponent;
  let fixture: ComponentFixture<MoviesSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesSearchResultsComponent ]
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
