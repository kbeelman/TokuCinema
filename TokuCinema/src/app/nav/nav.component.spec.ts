import { DeepSearch } from './../pipes/deepSearch.pipe';
import { SearchResultsComponent } from './../search-results/search-results.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule }   from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NavComponent } from './nav.component';
import { SearchResultTabComponent } from '../search-result-tab/search-result-tab.component';

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
      ]
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
});
