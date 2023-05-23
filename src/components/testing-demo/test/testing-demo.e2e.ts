import { newE2EPage } from '@stencil/core/testing';

describe('testing-demo', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<testing-demo></testing-demo>');

    const element = await page.find('testing-demo');
    expect(element).toHaveClass('hydrated');
  });
});
