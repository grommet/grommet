const base = `http://localhost:9001/iframe.html`;

export const getComponentStories = component =>
  `${base}?selectedKind=${component}`;

const getStory = (component, story) =>
  `${base}?selectedKind=${component}&selectedStory=${story}`;

export const takeScreenshots = (component, stories) => {
  stories.forEach(story => {
    cy.visit(getStory(component, story));
    cy.matchImageSnapshot(`${component}_${story.replace(/\s+/g, '-')}`);
  });
};
