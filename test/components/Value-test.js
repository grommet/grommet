// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Value from '../../src/js/components/Value';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.VALUE;

test('loads a Value', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Value, {
    value: 75
  }));
  const element = shallowRenderer.getRenderOutput();

  if (element.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Value has class');
  } else {
    t.fail('Value does not have class');
  }
});
