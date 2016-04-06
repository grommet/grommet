// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import App from '../../src/js/components/App';

test('loads a basic App', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(App));
  const appElement = shallowRenderer.getRenderOutput();

  if (appElement.props.className.indexOf('app') > -1) {
    t.pass('App has class');
  } else {
    t.fail('App does not have app class');
  }
});

test('loads an inline App', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(App, {inline: true}));
  const appElement = shallowRenderer.getRenderOutput();

  if (appElement.props.className.indexOf('app--inline') > -1) {
    t.pass('App has inline class');
  } else {
    t.fail('App does not have inline class');
  }
});

test('loads a custom className App', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();

  shallowRenderer.render(React.createElement(App, {className: 'testing'}));
  const appElement = shallowRenderer.getRenderOutput();

  if (appElement.props.className.indexOf('testing') > -1) {
    t.pass('App has testing class');
  } else {
    t.fail('App does not have testing class');
  }
});

test('loads an App with body', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();

  var AppWithBody = (
    <App><h2>App Body</h2></App>
  );

  shallowRenderer.render(
    AppWithBody
  );
  const appElement = shallowRenderer.getRenderOutput();

  if (appElement.props.className.indexOf('app') > -1) {
    t.pass('App has class');
  } else {
    t.fail('App does not have app class');
  }

  t.equal(
    appElement.props.children[0].props.children, 'App Body',
    'App has body'
  );
});
