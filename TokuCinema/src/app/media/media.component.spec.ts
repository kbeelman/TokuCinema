import { RouterTestingModule } from '@angular/router/testing';
import { MediaFiltersSearch } from './../pipes/media/mediaFilters.pipe';
import { MediaTitleSearch } from './../pipes/media/mediaTitle.pipe';
import { MediaCardComponent } from './../media-card/media-card.component';
import { MediaSearchResultsComponent } from './../media-search-results/media-search-results.component';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaComponent } from './media.component';
import { firebaseConfig } from '../app.component.spec';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

describe('MediaComponent', () => {
  let component: MediaComponent;
  let fixture: ComponentFixture<MediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaComponent,
        MediaSearchResultsComponent, 
        MediaCardComponent,
        MediaTitleSearch,
        MediaFiltersSearch
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
