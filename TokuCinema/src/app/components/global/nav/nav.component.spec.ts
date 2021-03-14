import { NavComponent } from './nav.component';
import { SearchResultsComponent } from '../../sub-pages/search-results/search-results.component';
import { SearchResultTabComponent } from '../../sub-pages/search-result-tab/search-result-tab.component';
import { ItemType } from '../../../domain/ItemType';
import { DeepSearch } from '../../../pipes/deepSearch.pipe';
import { FirebaseService } from '../../../services/firebase.service';
import { MockFirebaseService } from '../../../services/mock.firebase.service';
import { environment } from '../../../../environments/environment';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

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
      ]
    }).overrideComponent(NavComponent,
      {
        set: {
          providers: [
            { provide: FirebaseService, useClass: MockFirebaseService },
          ]
        }
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleNavMenu:', (() => {
    it('should close nav menu', () => {
      component.searchOpen = false;
      component.navMenuOpen = true;
      component.toggleNavMenu();
      expect(component.navMenuOpen).toEqual(false);
    });

    it('should open nav menu', () => {
      component.searchOpen = false;
      component.navMenuOpen = false;
      component.toggleNavMenu();
      expect(component.navMenuOpen).toEqual(true);
    });

    it('should open nav menu and close search menu', () => {
      component.searchOpen = true;
      component.navMenuOpen = false;
      component.toggleNavMenu();
      expect(component.navMenuOpen).toEqual(true);
      expect(component.searchOpen).toEqual(false);
    });
  }));

  describe('toggleSearch:', () => {
    it('should close search', () => {
      component.searchOpen = true;
      component.toggleSearch();
      expect(component.searchOpen).toEqual(false);
    });

    it('should open search', () => {
      component.navMenuOpen = false;
      component.searchOpen = false;
      component.toggleSearch();
      expect(component.searchOpen).toEqual(true);
      expect(component.navMenuOpen).toEqual(false);
    });

    it('should open search and close nav menu', () => {
      component.navMenuOpen = true;
      component.searchOpen = false;
      component.toggleSearch();
      expect(component.searchOpen).toEqual(true);
      expect(component.navMenuOpen).toEqual(false);
    });
  });

  it('closeNav: should close nav', () => {
    component.navMenuOpen = true;
    component.searchOpen = true;
    component.closeNav();
    expect(component.navMenuOpen).toEqual(false);
    expect(component.searchOpen).toEqual(false);
  });

  it('should clear search term', () => {
    component.searchTerm = 'test';
    component.clearSearch();
    expect(component.searchTerm).toEqual('');
  });

  it('getSearchItems: should return movies and media', () => {
    const results = component.getSearchItems();
    expect(results[0].getType()).toEqual(ItemType.Movie);
    expect(results[1].getType()).toEqual(ItemType.Media);
  });
});
