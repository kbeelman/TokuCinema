import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MovieAltVersionComponent } from './movie-alt-version.component';
import { MediaGalleryComponent } from '../../sub-pages/media-gallery/media-gallery.component';

describe('MovieAltDetailsComponent', () => {
  let component: MovieAltVersionComponent;
  let fixture: ComponentFixture<MovieAltVersionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAltVersionComponent, MediaGalleryComponent ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAltVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
