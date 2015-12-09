// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import App from '../../src/js/components/App';

describe('Grommet App', function() {
  it('loads a basic App', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(App));
    const appElement = shallowRenderer.getRenderOutput();

    expect(appElement.props.className).to.contain('app');
  });

  it('loads an inline App', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(App, {inline: true}));
    const appElement = shallowRenderer.getRenderOutput();

    expect(appElement.props.className).to.contain('app--inline');
  });

  it('loads a custom className App', () => {
    const shallowRenderer = TestUtils.createRenderer();

    shallowRenderer.render(React.createElement(App, {className: 'testing'}));
    const appElement = shallowRenderer.getRenderOutput();

    expect(appElement.props.className).to.contain('testing');
  });

  it('loads an App with body', () => {
    const shallowRenderer = TestUtils.createRenderer();

    var AppWithBody = (
      <App><h2>App Body</h2></App>
    );

    shallowRenderer.render(
      AppWithBody
    );
    const appElement = shallowRenderer.getRenderOutput();

    expect(appElement.props.className).to.contain('app');

    expect(appElement.props.children[1].props.children).to.equal(
      "App Body"
    );
  });
});
