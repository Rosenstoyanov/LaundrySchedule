import { LaundryAppPage } from './app.po';

describe('laundry-app App', function() {
  let page: LaundryAppPage;

  beforeEach(() => {
    page = new LaundryAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
