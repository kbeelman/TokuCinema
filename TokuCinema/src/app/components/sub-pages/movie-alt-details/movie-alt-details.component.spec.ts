import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieAltDetailsComponent } from './movie-alt-details.component';
import { MediaGalleryComponent } from '../../sub-pages/media-gallery/media-gallery.component';

describe('MovieAltDetailsComponent', () => {
  let component: MovieAltDetailsComponent;
  let fixture: ComponentFixture<MovieAltDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAltDetailsComponent, MediaGalleryComponent ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAltDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
