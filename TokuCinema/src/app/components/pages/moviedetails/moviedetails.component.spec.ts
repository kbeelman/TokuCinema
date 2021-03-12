import { NotFoundComponent } from './../not-found/not-found.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MoviedetailsComponent } from './moviedetails.component';
import { MovieAltDetailsComponent } from '../../sub-pages/movie-alt-details/movie-alt-details.component';
import { MediaGalleryComponent } from '../../sub-pages/media-gallery/media-gallery.component';
import { FirebaseService } from '../../../services/firebase.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MockFirebaseService } from '../../../services/mock.firebase.service';

describe('MoviedetailsComponent', () => {
  let component: MoviedetailsComponent;
  let fixture: ComponentFixture<MoviedetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviedetailsComponent, MediaGalleryComponent, NotFoundComponent, MovieAltDetailsComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireStorageModule
      ],
    }).overrideComponent(MoviedetailsComponent,
      {
        set: {
          providers: [
            { provide: FirebaseService, useClass: MockFirebaseService },
          ]
        }
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
