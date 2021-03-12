import { NotFoundComponent } from './../not-found/not-found.component';
import { MediaGalleryComponent } from '../../sub-pages/media-gallery/media-gallery.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MediadetailsComponent } from './mediadetails.component';
import { DomainBuilder, DataType } from '../../../domain/Builder';
import { FirebaseService } from '../../../services/firebase.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MockFirebaseService } from '../../../services/mock.firebase.service';
import { Movie } from '../../../domain/Movie';

describe('MediadetailsComponent', () => {
  let component: MediadetailsComponent;
  let fixture: ComponentFixture<MediadetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MediadetailsComponent, MediaGalleryComponent, NotFoundComponent],
      imports: [
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireStorageModule
      ],
    }).overrideComponent(MediadetailsComponent,
      {
        set: {
          providers: [
            { provide: FirebaseService, useClass: MockFirebaseService },
          ]
        }
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediadetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.movieDetails = [
      new DomainBuilder({
        OfficialTitle: 'Godzilla',
        AlternateTitles: [
          { TitleType: 'Japanese', TitleValue: 'ゴジラ' },
          { TitleType: 'Hepburn', TitleValue: 'Gojira' },
          { TitleType: 'Literal Translation', TitleValue: 'Godzilla' },
          { TitleType: 'U.S. Title', TitleValue: 'Godzilla, King of the Monsters!' }
        ],
        OriginalPoster: 'https://vignette4.wikia.nocookie.net/deathbattle/images/9/95/' +
          'Movie-poster-shop-godzilla_-king-of-the-monsters-_1954_.jpg/revision/latest?cb=20161028143059',
        ReleaseDate: '1954-11-03',
        ProductionCompany: 'Toho',
        CountryOfOrigin: 'Japan',
        Languages: ['Japanese', 'English'],
        Distributor: 'Toho',
        Director: 'Ishiro Honda',
        Series: 'Godzilla',
        Era: 'Showa',
        Runtime: '96',
        Path: 'Godzilla-1954'
      }, DataType.Movie).getDomainObject<Movie>()
    ];
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should know if does have runtimes', () => {
    expect(component.doesHaveRuntimes()).toEqual(true);
  });

});
