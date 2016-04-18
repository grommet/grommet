// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Anchor from '../../src/js/components/Anchor';
import FakeIcon from '../mocks/FakeIcon';

test('loads a basic Anchor', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Anchor, { href: 'test' }));
  const anchorElement = shallowRenderer.getRenderOutput();

  if (anchorElement.props.className.indexOf('anchor') > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  t.equal(anchorElement.props.href, 'test', 'Anchor has test href');
});


test('loads a primary Anchor', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Anchor, {
    href: 'test',
    primary: true
  }));
  const anchorElement = shallowRenderer.getRenderOutput();

  if (anchorElement.props.className.indexOf('anchor--primary') > -1) {
    t.pass('Anchor has primary class');
  } else {
    t.fail('Anchor does not have primary class');
  }
  t.equal(anchorElement.props.href, 'test', 'Anchor has test href');
});

test('loads a disabled Anchor', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Anchor, {
    primary: true,
    disabled: true
  }));
  const anchorElement = shallowRenderer.getRenderOutput();

  if (anchorElement.props.className.indexOf('anchor--primary') > -1) {
    t.pass('Anchor has primary class');
  } else {
    t.fail('Anchor does not have primary class');
  }

  if (anchorElement.props.className.indexOf('anchor--disabled') > -1) {
    t.pass('Anchor has disabled class');
  } else {
    t.fail('Anchor does not have disabled class');
  }
});

test('loads a clickable Anchor', (t) => {
  t.plan(3);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Anchor, {
    href: 'test',
    onClick: () => {}
  }));
  const anchorElement = shallowRenderer.getRenderOutput();

  if (anchorElement.props.className.indexOf('anchor') > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  if (anchorElement.props.className.indexOf('anchor--disabled') === -1) {
    t.pass('Anchor does not have disabled class');
  } else {
    t.fail('Anchor has disabled class');
  }
  t.equal(anchorElement.props.href, 'test', 'Anchor has test href');
});

test('loads an Anchor with an icon', (t) => {
  t.plan(4);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Anchor, {
    icon: <FakeIcon />
  }));
  const anchorElement = shallowRenderer.getRenderOutput();

  if (anchorElement.props.className.indexOf('anchor') > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  if (anchorElement.props.className.indexOf('anchor--icon') !== -1) {
    t.pass('Anchor has icon class');
  } else {
    t.fail('Anchor does not have icon class');
  }

  t.equal(
    anchorElement.props.children.length, 2, 'Anchor has two children'
  );
  t.equal(
    anchorElement.props.children[1], undefined, 'Anchor second child is undefined'
  );
});

test('loads an Anchor with an icon and label', (t) => {
  t.plan(4);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Anchor, {
    icon: <FakeIcon />,
    label: 'test'
  }));
  const anchorElement = shallowRenderer.getRenderOutput();

  if (anchorElement.props.className.indexOf('anchor') > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  if (anchorElement.props.className.indexOf('anchor--icon-label') !== -1) {
    t.pass('Anchor has icon-label class');
  } else {
    t.fail('Anchor does not have icon-label class');
  }

  t.equal(
    anchorElement.props.children.length, 2, 'Anchor has two children'
  );
  t.equal(
    anchorElement.props.children[1], 'test', 'Anchor has label'
  );
});

test('loads an Anchor with an icon and label reverse', (t) => {
  t.plan(4);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Anchor, {
    icon: <FakeIcon />,
    label: 'test',
    reverse: true
  }));
  const anchorElement = shallowRenderer.getRenderOutput();

  if (anchorElement.props.className.indexOf('anchor') > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  if (anchorElement.props.className.indexOf('anchor--icon-label') !== -1) {
    t.pass('Anchor has icon-label class');
  } else {
    t.fail('Anchor does not have icon-label class');
  }

  t.equal(
    anchorElement.props.children.length, 2, 'Anchor has two children'
  );
  t.equal(
    anchorElement.props.children[0], 'test', 'Anchor has label'
  );
});

test('loads an Anchor with a children icon', (t) => {
  t.plan(4);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Anchor, {
    children: <FakeIcon />
  }));
  const anchorElement = shallowRenderer.getRenderOutput();

  if (anchorElement.props.className.indexOf('anchor') > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  if (anchorElement.props.className.indexOf('anchor--icon') !== -1) {
    t.pass('Anchor has icon class');
  } else {
    t.fail('Anchor does not have icon class');
  }

  t.equal(
    anchorElement.props.children.length, 2, 'Anchor has two children'
  );
  t.equal(
    anchorElement.props.children[0], undefined, 'Anchor first child is undefined'
  );
});

test('loads an Anchor with a children text', (t) => {
  t.plan(4);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Anchor, {
    children: 'test'
  }));
  const anchorElement = shallowRenderer.getRenderOutput();

  if (anchorElement.props.className.indexOf('anchor') > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  t.equal(
    anchorElement.props.children.length, 2, 'Anchor has two children'
  );
  t.equal(
    anchorElement.props.children[0], undefined, 'Anchor first child is undefined'
  );
  t.equal(
    anchorElement.props.children[1][0], 'test', 'Anchor has text children'
  );
});
