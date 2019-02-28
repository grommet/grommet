import { getComponentStories, takeScreenshots } from '../utils';

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
