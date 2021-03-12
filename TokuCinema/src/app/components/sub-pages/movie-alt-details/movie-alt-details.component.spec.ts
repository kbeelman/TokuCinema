import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MovieAltDetailsComponent } from './movie-alt-details.component';
import { MediaGalleryComponent } from '../../sub-pages/media-gallery/media-gallery.component';
import { FirebaseService } from '../../../services/firebase.service';
import { MockFirebaseService } from '../../../services/mock.firebase.service';
import { stubGodzillaMovieAlternateVersion } from '../../../services/stub-data/stubGodzillaMovieAlternateVersion';
import { MovieAlternateVersion } from '../../../domain/MovieAlternateVersion';
import { MovieAltCountryComponent } from '../movie-alt-country/movie-alt-country.component';

describe('MovieAltDetailsComponent', () => {
  let component: MovieAltDetailsComponent;
  let fixture: ComponentFixture<MovieAltDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovieAltCountryComponent,
        MovieAltDetailsComponent,
        MediaGalleryComponent
      ],
      providers: [
        { provide: FirebaseService, useClass: MockFirebaseService },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAltDetailsComponent);
    component = fixture.componentInstance;
    component.movieAlternateVersion = stubGodzillaMovieAlternateVersion as unknown as MovieAlternateVersion;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
