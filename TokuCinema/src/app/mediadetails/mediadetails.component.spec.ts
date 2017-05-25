import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediadetailsComponent } from './mediadetails.component';

describe('MediadetailsComponent', () => {
  let component: MediadetailsComponent;
  let fixture: ComponentFixture<MediadetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediadetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediadetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
