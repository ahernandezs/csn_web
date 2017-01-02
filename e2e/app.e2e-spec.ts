import { CsnV1Page } from './app.po';

describe('csn-v1 App', function() {
  let page: CsnV1Page;

  beforeEach(() => {
    page = new CsnV1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
