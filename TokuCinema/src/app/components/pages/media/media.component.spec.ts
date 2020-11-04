import { RouterTestingModule } from '@angular/router/testing';
import { MediaFiltersSearch } from '../../../pipes/media/mediaFilters.pipe';
import { MediaTitleSearch } from '../../../pipes/media/mediaTitle.pipe';
import { MediaCardComponent } from '../../sub-pages/media-card/media-card.component';
import { MediaSearchResultsComponent } from '../../sub-pages/media-search-results/media-search-results.component';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MediaComponent } from './media.component';
import { environment } from '../../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FirebaseService } from '../../../services/firebase.service';
import { ReleaseYearSortPipe } from 'app/pipes/release-year-sort.pipe';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MockFirebaseService } from 'app/services/mock.firebase.service';

describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MediaComponent,
        MediaSearchResultsComponent,
        MediaCardComponent,
        MediaTitleSearch,
        MediaFiltersSearch,
        ReleaseYearSortPipe
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireStorageModule
      ],
    }).overrideComponent(MediaComponent,
      {
        set: {
          providers: [
            { provide: FirebaseService, useClass: MockFirebaseService },
          ]
        }
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should clear filters', () => {
    component.countryFilter = 'test';
    component.mediumFilter = 'test';
    component.regionFilter = 'test';
    component.spokenLanguageFilter = 'test';
    component.subtitleLanguageFilter = 'test';

    component.clearFilters();

    expect(component.countryFilter).toEqual('');
    expect(component.mediumFilter).toEqual('');
    expect(component.regionFilter).toEqual('');
    expect(component.spokenLanguageFilter).toEqual('');
    expect(component.subtitleLanguageFilter).toEqual('');
  });

  it('should toggle show filters', () => {
    component.showFilters = 'Show filters +';
    component.toggleShowFilters();
    expect(component.showFilters).toEqual('Hide filters -');
    component.toggleShowFilters();
    expect(component.showFilters).toEqual('Show filters +');
  });
});
