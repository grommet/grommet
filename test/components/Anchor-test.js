// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Anchor from '../../src/js/components/Anchor';

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
