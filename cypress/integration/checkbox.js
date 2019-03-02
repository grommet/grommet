import { screenshotTestWrapper, cleanStorybookState, getStory } from '../utils';

const component = 'CheckBox';
const stories = [
  'Disabled',
  'Reverse',
  'Inside a Button',
  'Indeterminate CheckBox',
];

screenshotTestWrapper(component, stories);

describe(`${component} storybook interaction`, () => {
  beforeEach(() => cleanStorybookState(component));

  it('on click', () => {
    cy.visit(getStory(component, 'Simple'));
    cy.matchImageSnapshot(`${component}_simple_unchecked`);
    cy.queryByText('Choice').click();
    cy.matchImageSnapshot(`${component}_simple_checked`);
  });

  it('on click toggle', () => {
    cy.visit(getStory(component, 'Toggle'));
    cy.matchImageSnapshot(`${component}_toggle_unchecked`);
    cy.queryByText('Choice').click();
    cy.matchImageSnapshot(`${component}_toggle_checked`);
  });

  it('on click for themed', () => {
    cy.visit(getStory(component, 'Themed CheckBox'));
    cy.matchImageSnapshot(`${component}_themed_unchecked`);
    cy.queryByText('Choice').click();
    cy.matchImageSnapshot(`${component}_themed_checked`);
  });

  it('on click for themed toggle', () => {
    cy.visit(getStory(component, 'Themed Toggle'));
    cy.matchImageSnapshot(`${component}_themed_toggle_unchecked`);
    cy.queryByText('Choice').click();
    cy.matchImageSnapshot(`${component}_themed_toggle_checked`);
  });
});
