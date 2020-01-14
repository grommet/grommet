import { create } from '@storybook/theming';

// https://storybook.js.org/docs/configurations/theming/

export default create({
  base: 'light',

  colorSecondary: '#E15151',

  appBg: '#F8F8F8',
  appBorderColor: '#EDEDED',
  appBorderRadius: 6,

  barTextColor: '#999999',
  barSelectedColor: '#E15151',
  barBg: '#F2F2F2',

  inputBg: 'white',
  inputBorder: 'rgba(0,0,0,.1)',
  inputTextColor: '#333333',
  inputBorderRadius: 4,

  brandImage: 'https://mnet-ui-base.netlify.com/img/logos/mnetb.svg',
  brandUrl: 'https://mnet-ui-base.netlify.com/',
});
