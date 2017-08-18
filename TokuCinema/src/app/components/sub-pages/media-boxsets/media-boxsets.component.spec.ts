import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaBoxsetsComponent } from './media-boxsets.component';

describe('MediaBoxsetsComponent', () => {
  let component: MediaBoxsetsComponent;
  let fixture: ComponentFixture<MediaBoxsetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaBoxsetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaBoxsetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
