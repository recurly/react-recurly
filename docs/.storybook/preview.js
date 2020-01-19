import { configure, addParameters } from '@storybook/react';

import { create } from '@storybook/theming';
import { version } from '../../package.json';

const theme = create({
  base: 'light',
  brandTitle: `react-recurly ${version}`,
  // brandImage: 'https://recurly.com/img2/brand/wordmark-1@2x.png'

  fontBase: '"Open Sans", Helvetica, sans-serif',
  appBg: 'rgb(250, 250, 250)',
  colorSecondary: '#5191b7'
});

addParameters({
  options: {
    theme,
    showRoots: true,
    storySort: (a, b) => (a[1].parameters.sortOrder || 0) - (b[1].parameters.sortOrder || 0)
  }
});
