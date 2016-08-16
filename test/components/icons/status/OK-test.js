import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import OK from '../../../../src/js/components/icons/status/OK';
import CSSClassnames from '../../../../src/js/utils/CSSClassnames';

const STATUS_ICON = CSSClassnames.STATUS_ICON;

test('loads a ok icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(OK));
  const okIcon = shallowRenderer.getRenderOutput();
  
  if (okIcon.props.className.indexOf(`${STATUS_ICON}-ok`) > -1) {
    t.pass('Icon has ok class');
  } else {
    t.fail('Icon does not have ok class');
  }   
});

test('loads a ok icon with custom class applied', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(OK, {
    className:'custom-class'
  }));
  const okIcon = shallowRenderer.getRenderOutput();
  
  if (okIcon.props.className.indexOf('custom-class') > -1) {
    t.pass('OK icon has custom class applied');
  } else {
    t.fail('OK icon does not have custom class applied');
  }   
});
