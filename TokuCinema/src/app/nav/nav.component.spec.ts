import { DeepSearch } from './../pipes/deepSearch.pipe';
import { SearchResultsComponent } from './../search-results/search-results.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule }   from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { firebaseConfig } from '../app.component.spec';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent,
        SearchResultsComponent,
        DeepSearch
      ],
      imports: [ 
        RouterTestingModule, 
        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
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
