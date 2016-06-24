// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import DateTime from '../../src/js/components/DateTime';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.DATE_TIME;

test('loads a DateTime', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(DateTime, {
    value: '4/7/2015 10:00 am'
  }));
  const dateTimeElement = shallowRenderer.getRenderOutput();

  if (dateTimeElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('DateTime has class');
  } else {
    t.fail('DateTime does not have class');
  }
});
