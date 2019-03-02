import { screenshotTestWrapper } from '../utils';

const component = 'Box';
const stories = [
  'Custom color',
  'Fixed sizes',
  'Border',
  'Round',
  'Background',
  'Elevation',
  'Simple Box',
];

screenshotTestWrapper(component, stories);
