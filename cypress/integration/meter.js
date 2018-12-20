describe('Meter storybook', () => {
  beforeEach(() => {
      // Visiting the storybook each test removes any state build up from other tests
      // This should probably default to index story and then have each context pick
      // its own component and test it
      cy.visit('http://localhost:9001/?selectedKind=Meter&selectedStory=Bar')
  })
  // Let's build some tests around the Meter story
  context('Default meter', () => {
    it('capture default meter', () => {
      cy.get("#storybook-preview-iframe").screenshot()
    })

    it('capture circle meter', () => {
      cy.get('a[href="/?selectedKind=Meter&selectedStory=Circle"]').click();
      cy.get("#storybook-preview-iframe").screenshot()
    })
  })
})
