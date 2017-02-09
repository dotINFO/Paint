import { PaintPage } from './app.po';

describe('paint App', function() {
  let page: PaintPage;

  beforeEach(() => {
    page = new PaintPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
