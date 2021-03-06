import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MediaCardComponent } from './../media-card/media-card.component';
import { MediaTitleSearch } from '../../../pipes/media/mediaTitle.pipe';
import { MediaFiltersSearch } from '../../../pipes/media/mediaFilters.pipe';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MediaSearchResultsComponent } from './media-search-results.component';
import { ReleaseYearSortPipe } from '../../../pipes/release-year-sort.pipe';

describe('MediaSearchResultsComponent', () => {
  let component: MediaSearchResultsComponent;
  let fixture: ComponentFixture<MediaSearchResultsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MediaSearchResultsComponent,
        MediaTitleSearch,
        MediaFiltersSearch,
        MediaCardComponent,
        ReleaseYearSortPipe
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
