import { TestBed, ComponentFixture, async, waitForAsync } from '@angular/core/testing';
import { MediaGalleryComponent } from '../media-gallery.component';
import { GalleryImage } from '../domain/GalleryImage';
import { GalleryVideo } from '../domain/GalleryVideo';

const stubImages = [
    new GalleryImage(
      'http://www.branch-associates.com/wp-content/uploads/2015/04/carilion-4.jpg',
      'http://www.branch-associates.com/wp-content/uploads/2015/04/carilion-4.jpg',
      'test 1', 0),
    new GalleryImage(
      'http://lpa-inc.com/wp-content/uploads/2012/10/CrystalSpring_MOB.jpg',
      'http://lpa-inc.com/wp-content/uploads/2012/10/CrystalSpring_MOB.jpg',
      'test 2', 1),
    new GalleryImage(
      'https://www.carilionclinic.org/sites/all/themes/bear_claw/images/location_images/loc_CRCH.jpg',
      'https://www.carilionclinic.org/sites/all/themes/bear_claw/images/location_images/loc_CRCH.jpg',
      'test 3', 2),
    new GalleryImage(
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRKdMIuHzruM2M_SnXajH2UZMFoHygEHSaedad9ojO0tPGjzOP9',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRKdMIuHzruM2M_SnXajH2UZMFoHygEHSaedad9ojO0tPGjzOP9',
      'test 4', 3)
];

const stubVideos = [
    new GalleryVideo('YT', '5Z2zzeNn1Jc', 0, ''),
    new GalleryVideo('YT', 'BtHxdKxzSOQ', 1, ''),
    new GalleryVideo('YT', 'kGz1x9IIZEA', 2, '')
];

let comp: MediaGalleryComponent;
let fixture: ComponentFixture<MediaGalleryComponent>;

describe('media gallery component', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MediaGalleryComponent
      ],
      imports: [ ],
    }).overrideComponent(MediaGalleryComponent, {
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(MediaGalleryComponent);
      comp = fixture.componentInstance;

      fixture.detectChanges();
    });
  }));

  it('should construct', waitForAsync(() => {
    expect(comp).toBeDefined();
  }));

  it('should setup images', waitForAsync(() => {
    comp.images = [
      {
        'Screencap': 'sc1',
        'Thumbnail': 'tn1',
        'Description': 'd1',
        'Name': 'n1'
      },
      {
        'Screencap': 'sc2',
        'Thumbnail': 'tn2',
        'Description': 'd2',
        'Name': 'n2'
      }
    ];
    comp.setupImages();
    expect(comp.galleryImages[0]).toEqual(new GalleryImage('sc1', 'tn1', 'd1', 0));
  }));

  // it('should setup videos', waitForAsync(() => {
  //   comp.videoIds = ['asldkjf', 'alkdfdfdf'];
  //   comp.setupVideos();
  //   expect(comp.galleryVideos[0]).toEqual(new GalleryVideo('asldkjf', 0));
  // }));

  it('should choose default active item', waitForAsync(() => {
    comp.galleryImages = stubImages;
    comp.galleryVideos = stubVideos;
    comp.chooseDefaultActiveItem();
    expect(comp.activeItem).toEqual(comp.galleryVideos[0]);
  }));

  it('should know if active item is an image', () => {
    comp.activeItem = stubImages[0];
    expect(comp.activeItemIsImage()).toBeTruthy();
  });

  it('should know if active item is a video', () => {
    comp.activeItem = stubVideos[0];
    expect(comp.activeItemIsVideo()).toBeTruthy();
  });

  it('should set active item', waitForAsync(() => {
    comp.setActiveItem(stubImages[0]);
    expect(comp.activeItem).toEqual(stubImages[0]);
  }));

  // it('should carousel right', async(() => {
  //   comp.galleryImages = stubImages;
  //   comp.galleryVideos = stubVideos;
  //   comp.currentCarouselMargin = 0;
  //   comp.currentCarouselPosition = 0;
  //   comp.carouselRight();
  //   expect(comp.currentCarouselMargin).toEqual(0 - comp.carouselInterval);
  //   expect(comp.currentCarouselPosition).toEqual(1);
  // }));

  // it('should carousel left', async(() => {
  //   comp.galleryImages = stubImages;
  //   comp.galleryVideos = stubVideos;
  //   comp.currentCarouselMargin = 0;
  //   comp.currentCarouselPosition = 1;
  //   comp.carouselLeft();
  //   expect(comp.currentCarouselMargin).toEqual(0 + comp.carouselInterval);
  //   expect(comp.currentCarouselPosition).toEqual(0);
  // }));

  it('should get current carousel margin', () => {
    comp.currentCarouselMargin = 10;
    expect(comp.getCurrentCarouselMargin()).toEqual('10%');
  });

  it('should know when it can carousel right', () => {
    comp.galleryImages = stubImages;
    comp.galleryVideos = stubVideos;
    comp.currentCarouselPosition = 0;
    expect(comp.canCarouselRight()).toBeTruthy();
  });

  it('should know when it can carousel left', () => {
    comp.currentCarouselPosition = 1;
    expect(comp.canCarouselLeft()).toBeTruthy();
  });

});
