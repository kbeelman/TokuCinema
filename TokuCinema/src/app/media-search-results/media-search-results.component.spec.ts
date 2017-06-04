import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSearchResultsComponent } from './media-search-results.component';

describe('MediaSearchResultsComponent', () => {
  let component: MediaSearchResultsComponent;
  let fixture: ComponentFixture<MediaSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaSearchResultsComponent ]
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
