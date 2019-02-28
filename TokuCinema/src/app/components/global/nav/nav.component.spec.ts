import { DeepSearch } from '../../../pipes/deepSearch.pipe';
import { SearchResultsComponent } from '../../sub-pages/search-results/search-results.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule }   from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NavComponent } from './nav.component';
import { SearchResultTabComponent } from '../../sub-pages/search-result-tab/search-result-tab.component';
import { FirebaseService } from '../../../services/firebase.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
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
        AngularFireDatabaseModule
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
