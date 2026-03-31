import { addons } from '@storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme,
  showNav: true,
  showPanel: true, // show the code panel by default
});
