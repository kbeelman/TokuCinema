import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieAltCountryComponent } from './movie-alt-country.component';
import { MediaGalleryComponent } from '../../sub-pages/media-gallery/media-gallery.component';

describe('MovieAltDetailsComponent', () => {
  let component: MovieAltCountryComponent;
  let fixture: ComponentFixture<MovieAltCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAltCountryComponent, MediaGalleryComponent ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAltCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
