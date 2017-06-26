import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MediadetailsComponent } from './mediadetails.component';
import { Movie } from '../../domain/Movie';
import { DomainBuilder, DataType } from '../../domain/Builder';

describe('MediadetailsComponent', () => {
  let component: MediadetailsComponent;
  let fixture: ComponentFixture<MediadetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediadetailsComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediadetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.movieDetails = [
      new DomainBuilder({
            "OfficialTitle": "Godzilla",
            "AlternateTitles": [{"TitleType":"Japanese","TitleValue":"ゴジラ"},{"TitleType":"Hepburn","TitleValue":"Gojira"},{"TitleType":"Literal Translation","TitleValue":"Godzilla"},{"TitleType":"U.S. Title","TitleValue":"Godzilla, King of the Monsters!"}],
            "OriginalPoster": "https://vignette4.wikia.nocookie.net/deathbattle/images/9/95/Movie-poster-shop-godzilla_-king-of-the-monsters-_1954_.jpg/revision/latest?cb=20161028143059",
            "ReleaseYear": "1954",
            "ProductionCompany": "Toho",
            "CountryOfOrigin": "Japan",
            "Languages": ["Japanese", "English"],
            "Distributor": "Toho",
            "Director": "Ishiro Honda",
            "Series": "Godzilla",
            "Era": "Showa",
            "Runtime": "96",
            "Path": "Godzilla-1954"
        }, DataType.Movie).getDomainObject()
    ];
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should know if does have runtimes', () => {
    expect(component.doesHaveRuntimes()).toEqual(true);
  });

});
