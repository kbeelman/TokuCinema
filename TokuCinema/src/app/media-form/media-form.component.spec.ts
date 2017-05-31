import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFormComponent } from './media-form.component';

describe('MediaFormComponent', () => {
  let component: MediaFormComponent;
  let fixture: ComponentFixture<MediaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
