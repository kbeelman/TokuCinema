import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MovieAltCountryComponent } from './movie-alt-country.component';
import { MediaGalleryComponent } from '../../sub-pages/media-gallery/media-gallery.component';
import { FirebaseService } from '../../../services/firebase.service';
import { MockFirebaseService } from '../../../services/mock.firebase.service';

describe('MovieAltCountryComponent', () => {
  let component: MovieAltCountryComponent;
  let fixture: ComponentFixture<MovieAltCountryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAltCountryComponent, MediaGalleryComponent ],
      providers: [
        { provide: FirebaseService, useClass: MockFirebaseService },
      ]
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
