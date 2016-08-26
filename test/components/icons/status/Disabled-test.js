import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Disabled from '../../../../src/js/components/icons/status/Disabled';
import CSSClassnames from '../../../../src/js/utils/CSSClassnames';

const STATUS_ICON = CSSClassnames.STATUS_ICON;

test('loads a disabled icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Disabled));
  const disabledIcon = shallowRenderer.getRenderOutput();
  
  if (disabledIcon.props.className.indexOf(`${STATUS_ICON}-disabled`) > -1) {
    t.pass('Icon has disabled class');
  } else {
    t.fail('Icon does not have disabled class');
  }   
});

test('loads a disabled icon with custom class applied', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Disabled, {
    className:'custom-class'
  }));
  const disabledIcon = shallowRenderer.getRenderOutput();
  
  if (disabledIcon.props.className.indexOf('custom-class') > -1) {
    t.pass('Disabled icon has custom class applied');
  } else {
    t.fail('Disabled icon does not have custom class applied');
  }   
});
