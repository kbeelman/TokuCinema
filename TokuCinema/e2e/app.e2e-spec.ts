import { TokuCinemaPage } from './app.po';

describe('toku-cinema App', () => {
  let page: TokuCinemaPage;

  beforeEach(() => {
    page = new TokuCinemaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
