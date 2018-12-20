export const getComponentStories = component =>
  `http://localhost:9001/?selectedKind=${component}`;

const getStory = (component, story) =>
  `a[href="/?selectedKind=${component}&selectedStory=${story}"]`;

export const takeScreenshots = (component, stories) => {
  stories.forEach(story => {
    cy.get(getStory(component, story)).click();
    cy.get('#storybook-preview-iframe').screenshot(
      `${component}_${story.replace(/\s+/g, '-')}`,
    );
  });
};
