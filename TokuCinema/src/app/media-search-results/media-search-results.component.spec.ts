import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MediaCardComponent } from './../media-card/media-card.component';
import { MediaTitleSearch } from './../pipes/media/mediaTitle.pipe';
import { MediaFiltersSearch } from './../pipes/media/mediaFilters.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSearchResultsComponent } from './media-search-results.component';

describe('MediaSearchResultsComponent', () => {
  let component: MediaSearchResultsComponent;
  let fixture: ComponentFixture<MediaSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaSearchResultsComponent, 
        MediaTitleSearch, 
        MediaFiltersSearch,
        MediaCardComponent
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
