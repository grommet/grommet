// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Button from '../../src/js/components/Button';
import FakeIcon from '../mocks/FakeIcon';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.BUTTON;

test('loads a basic Button', (t) => {
  t.plan(3);

  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Button, {
    label: 'Test Me'
  }));
  const buttonElement = shallowRenderer.getRenderOutput();

  if (buttonElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Button has class');
  } else {
    t.fail('Button does not have class');
  }

  if (buttonElement.props.className.indexOf(`${CLASS_ROOT}--disabled`) > -1) {
    t.pass('Button has disabled class');
  } else {
    t.fail('Button does not have disabled class');
  }

  t.equal(buttonElement.props.children[1], 'Test Me', 'Button has children');
});

test('loads a primary Button', (t) => {
  t.plan(3);

  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Button, {
    label: 'Test Me Primary',
    primary: true
  }));
  const buttonElement = shallowRenderer.getRenderOutput();

  if (buttonElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Button has class');
  } else {
    t.fail('Button does not have class');
  }

  if (buttonElement.props.className.indexOf(`${CLASS_ROOT}--primary`) > -1) {
    t.pass('Button has primary class');
  } else {
    t.fail('Button does not have primary class');
  }

  t.equal(
    buttonElement.props.children[1], 'Test Me Primary', 'Button has children'
  );
});

test('loads a plain Button', (t) => {
  t.plan(3);

  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Button, {
    label: 'Test Me Plain',
    plain: true
  }));
  const buttonElement = shallowRenderer.getRenderOutput();

  if (buttonElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Button has class');
  } else {
    t.fail('Button does not have class');
  }

  if (buttonElement.props.className.indexOf(`${CLASS_ROOT}--plain`) > -1) {
    t.pass('Button has plain class');
  } else {
    t.fail('Button does not have plain class');
  }

  t.equal(
    buttonElement.props.children[1], 'Test Me Plain', 'Button has children'
  );
});

test('loads a custom className Button', (t) => {
  t.plan(3);

  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Button, {
    label: 'Custom Class',
    className: 'testing'
  }));
  const buttonElement = shallowRenderer.getRenderOutput();
  if (buttonElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Button has class');
  } else {
    t.fail('Button does not have class');
  }

  if (buttonElement.props.className.indexOf('testing') > -1) {
    t.pass('Button has custom class');
  } else {
    t.fail('Button does not have custom class');
  }

  t.equal(
    buttonElement.props.children[1], 'Custom Class', 'Button has children'
  );
});

test('loads an Button with an icon', (t) => {
  t.plan(4);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Button, {
    icon: <FakeIcon />
  }));
  const buttonElement = shallowRenderer.getRenderOutput();

  if (buttonElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Button has class');
  } else {
    t.fail('Button does not have class');
  }

  if (buttonElement.props.className.indexOf(`${CLASS_ROOT}--icon`) !== -1) {
    t.pass('Button has icon class');
  } else {
    t.fail('Button does not have icon class');
  }

  t.equal(
    buttonElement.props.children.length, 2, 'Button has two children'
  );
  t.equal(
    buttonElement.props.children[1], undefined,
    'Button second child is undefined'
  );
});

test('loads an Button with a children icon', (t) => {
  t.plan(4);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Button, {
    children: <FakeIcon />
  }));
  const buttonElement = shallowRenderer.getRenderOutput();

  if (buttonElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Button has class');
  } else {
    t.fail('Button does not have button class');
  }

  if (buttonElement.props.className.indexOf(`${CLASS_ROOT}--icon`) !== -1) {
    t.pass('Button has icon class');
  } else {
    t.fail('Button does not have icon class');
  }

  t.equal(
    buttonElement.props.children.length, 2, 'Button has two children'
  );
  t.equal(
    buttonElement.props.children[0], undefined,
    'Button first child is undefined'
  );
});

test('loads an Button with a children text', (t) => {
  t.plan(4);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Button, {
    children: 'test'
  }));
  const buttonElement = shallowRenderer.getRenderOutput();

  if (buttonElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Button has class');
  } else {
    t.fail('Button does not have button class');
  }

  t.equal(
    buttonElement.props.children.length, 2, 'Button has two children'
  );
  t.equal(
    buttonElement.props.children[0], undefined,
    'Button first child is undefined'
  );
  t.equal(
    buttonElement.props.children[1][0], 'test', 'Button has text children'
  );
});
