// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Timestamp from '../../src/js/components/Timestamp';

test('loads a Timestamp', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  const now = new Date();
  shallowRenderer.render(React.createElement(Timestamp, { value: now }));
  const element = shallowRenderer.getRenderOutput();

  if (element.props.className.indexOf('timestamp') > -1) {
    t.pass('Timestamp has class');
  } else {
    t.fail('Timestamp does not have class');
  }
});
