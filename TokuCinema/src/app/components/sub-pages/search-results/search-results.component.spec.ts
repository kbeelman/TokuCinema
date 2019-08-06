import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { DeepSearch } from '../../../pipes/deepSearch.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultTabComponent } from '../search-result-tab/search-result-tab.component';

import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultsComponent,
        DeepSearch,
        SearchResultTabComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
