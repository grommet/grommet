import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Unknown from '../../../../src/js/components/icons/status/Unknown';
import CSSClassnames from '../../../../src/js/utils/CSSClassnames';

const STATUS_ICON = CSSClassnames.STATUS_ICON;

test('loads a unknown icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Unknown));
  const unknownIcon = shallowRenderer.getRenderOutput();
  
  if (unknownIcon.props.className.indexOf(`${STATUS_ICON}-unknown`) > -1) {
    t.pass('Icon has unknown class');
  } else {
    t.fail('Icon does not have unknown class');
  }   
});

test('loads a unknown icon with custom class applied', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Unknown, {
    className:'custom-class'
  }));
  const unknownIcon = shallowRenderer.getRenderOutput();
  
  if (unknownIcon.props.className.indexOf('custom-class') > -1) {
    t.pass('Unknown icon has custom class applied');
  } else {
    t.fail('Unknown icon does not have custom class applied');
  }   
});
