import { DeepSearch } from '../../../pipes/deepSearch.pipe';
import { SearchResultsComponent } from '../../sub-pages/search-results/search-results.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NavComponent } from './nav.component';
import { SearchResultTabComponent } from '../../sub-pages/search-result-tab/search-result-tab.component';
import { FirebaseService } from '../../../services/firebase.service';
import { AngularFireStorageModule } from '@angular/fire/storage';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent,
        SearchResultsComponent,
        DeepSearch,
        SearchResultTabComponent
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireStorageModule
      ],
      providers: [FirebaseService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle nav menu', () => {
    component.navMenuOpen = true;
    component.toggleNavMenu();
    expect(component.navMenuOpen).toEqual(false);
  });

  it('should toggle search', () => {
    component.searchOpen = true;
    component.toggleSearch();
    expect(component.searchOpen).toEqual(false);
  });

  it('should close nav', () => {
    component.navMenuOpen = true;
    component.searchOpen = true;
    component.closeNav();
    expect(component.navMenuOpen).toEqual(false);
    expect(component.searchOpen).toEqual(false);
  });
});
