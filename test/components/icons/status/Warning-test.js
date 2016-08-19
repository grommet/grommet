import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Warning from '../../../../src/js/components/icons/status/Warning';
import CSSClassnames from '../../../../src/js/utils/CSSClassnames';

const STATUS_ICON = CSSClassnames.STATUS_ICON;

test('loads a warning icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Warning));
  const warningIcon = shallowRenderer.getRenderOutput();
  
  if (warningIcon.props.className.indexOf(`${STATUS_ICON}-warning`) > -1) {
    t.pass('Icon has warning class');
  } else {
    t.fail('Icon does not have warning class');
  }   
});

test('loads a warning icon with custom class applied', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Warning, {
    className:'custom-class'
  }));
  const warningIcon = shallowRenderer.getRenderOutput();
  
  if (warningIcon.props.className.indexOf('custom-class') > -1) {
    t.pass('Warning icon has custom class applied');
  } else {
    t.fail('Warning icon does not have custom class applied');
  }   
});
