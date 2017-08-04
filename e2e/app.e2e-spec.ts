import { WebclientPage } from './app.po';

describe('webclient App', () => {
  let page: WebclientPage;

  beforeEach(() => {
    page = new WebclientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
