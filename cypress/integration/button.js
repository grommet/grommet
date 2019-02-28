import { getComponentStories, takeScreenshots } from '../utils';

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

describe(`${component} storybook`, () => {
  beforeEach(() => {
    // Visiting the storybook each test removes any state build up from other tests
    // This should probably default to index story and then have each context pick
    // its own component and test it
    cy.viewport(1280, 720);
    cy.visit(getComponentStories(component));
  });
  it('stories screenshots', () => {
    takeScreenshots(component, stories);
  });
});
