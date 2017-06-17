import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultTabComponent } from './search-result-tab.component';

describe('SearchResultTabComponent', () => {
  let component: SearchResultTabComponent;
  let fixture: ComponentFixture<SearchResultTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
