// eslint-disable-next-line import/no-unresolved
import { create } from 'storybook/theming';
// import/no-unresolved issue see -
// https://github.com/storybookjs/storybook/issues/31863

// new import destination for storybook theming -
// https://storybook.js.org/docs/configure/user-interface/theming

export default create({
  base: 'light',

  colorSecondary: '#7D4CDB',

  appBg: '#F8F8F8',
  appBorderColor: '#EDEDED',
  appBorderRadius: 6,

  barTextColor: '#999999',
  barSelectedColor: '#7D4CDB',
  barBg: '#F2F2F2',

  inputBg: 'white',
  inputBorder: 'rgba(0,0,0,.1)',
  inputTextColor: '#333333',
  inputBorderRadius: 4,

  brandTitle: 'Grommet',
  brandImage: 'grommet-logo.svg',
  brandUrl: 'https://v2.grommet.io/',
});
