import { screenshotTestWrapper } from '../utils';

const component = 'Button';
const stories = [
  'Primary',
  'Icon',
  'Icon Label',
  'Disabled',
  'Plain',
  'Anchor',
  'RoutedButton',
  'Active',
  'Custom theme',
  'Multiple Same Line',
  'Colored',
  'Theme Colored',
  'Custom tag Button',
  'Default',
];

screenshotTestWrapper(component, stories);
