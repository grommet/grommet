const base = `http://localhost:9001/iframe.html`;

const getComponentStories = component => `${base}?selectedKind=${component}`;

export const getStory = (component, story) =>
  `${base}?selectedKind=${component}&selectedStory=${story}`;

const takeScreenshots = (component, stories) => {
  stories.forEach(story => {
    cy.visit(getStory(component, story));
    cy.matchImageSnapshot(`${component}_${story.replace(/\s+/g, '-')}`);
  });
};

/*
 * Visiting the storybook before each test removes any state build up from other tests
 * This should probably default to index story and then have each context pick
 * its own component and test it
 */
export const cleanStorybookState = component => {
  cy.viewport(1280, 720);
  cy.visit(getComponentStories(component));
};

export const screenshotTestWrapper = (component, stories) => {
  describe(`${component} storybook`, () => {
    beforeEach(() => cleanStorybookState(component));

    it('stories screenshots', () => {
      takeScreenshots(component, stories);
    });
  });
};
