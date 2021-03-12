import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MovieAltVersionComponent } from './movie-alt-version.component';
import { MediaGalleryComponent } from '../../sub-pages/media-gallery/media-gallery.component';
import { stubGodzillaVersion } from '../../../services/stub-data/stubGodzillaVersion';
import { Version } from '../../../domain/Version';

describe('MovieAltVersionComponent', () => {
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
    component.version = stubGodzillaVersion as unknown as Version;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
