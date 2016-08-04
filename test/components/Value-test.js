// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Value from '../../src/js/components/Value';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.VALUE;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

test('loads a Value', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Value, {
    value: 75
  }));
  const element = shallowRenderer.getRenderOutput();
  const valueElement = element.props.children[0].props.children[1];

  if (element.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Value has class');
  } else {
    t.fail('Value does not have class');
  }

  t.equal(
    valueElement.props.children, 75, 'Value is 75'
  );

});

test('loads a Value with units', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Value, {
    value: 75,
    units: '%'
  }));
  const element = shallowRenderer.getRenderOutput();
  const unitsElement = element.props.children[0].props.children[2];

  if (unitsElement.props.className.indexOf(`${CLASS_ROOT}__units`) > -1) {
    t.pass('Value has units class');
  } else {
    t.fail('Value does not have units class');
  }

  t.equal(
    unitsElement.props.children, '%', 'Value has % units'
  );
});

test('loads a Value with label', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Value, {
    value: 75,
    label: 'World wide coverage'
  }));
  const element = shallowRenderer.getRenderOutput();
  const labelElement = element.props.children[1];

  if (labelElement.props.className.indexOf(`${CLASS_ROOT}__label`) > -1) {
    t.pass('Value has label class');
  } else {
    t.fail('Value does not have label class');
  }

  t.equal(
    labelElement.props.children, 'World wide coverage',
    'Value has World wide coverage label' 
  );
});

test('loads a Value in large size', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Value, {
    value: 75,
    size: 'large'
  }));
  const element = shallowRenderer.getRenderOutput();

  if (element.props.className.indexOf(`${CLASS_ROOT}--large`) > -1) {
    t.pass('Value has large class');
  } else {
    t.fail('Value does not have large class');
  }
});

test('loads a Value in end alignment', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Value, {
    value: 75,
    align: 'end'
  }));
  const element = shallowRenderer.getRenderOutput();

  if (element.props.className.indexOf(`${CLASS_ROOT}--align-end`) > -1) {
    t.pass('Value has end align class');
  } else {
    t.fail('Value does not have end align class');
  }
});

test('loads a Value with color index', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Value, {
    value: 75,
    colorIndex: 'neutral-1'
  }));
  const element = shallowRenderer.getRenderOutput();

  if (element.props.className.indexOf(`${COLOR_INDEX}-neutral-1`) > -1) {
    t.pass('Value has color index class');
  } else {
    t.fail('Value does not have color index class');
  }
});

test('loads a Value with custom class', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Value, {
    value: 75,
    className: 'custom-classname'
  }));
  const element = shallowRenderer.getRenderOutput();

  if (element.props.className.indexOf('custom-classname') > -1) {
    t.pass('Value has custom class');
  } else {
    t.fail('Value does not have custom class');
  }
});

test('loads a Value with active class', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Value, {
    value: 75,
    active: true
  }));
  const element = shallowRenderer.getRenderOutput();

  if (element.props.className.indexOf(`${CLASS_ROOT}--active`) > -1) {
    t.pass('Value has active class');
  } else {
    t.fail('Value does not have active class');
  }
});

test('loads a Value with interactive class', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Value, {
    value: 75,
    onClick: function() {
      return true;
    }
  }));
  const element = shallowRenderer.getRenderOutput();

  if (element.props.className.indexOf(`${CLASS_ROOT}--interactive`) > -1) {
    t.pass('Value has interactive class');
  } else {
    t.fail('Value does not have interactive class');
  }
});
