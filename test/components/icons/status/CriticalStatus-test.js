import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import CriticalStatus from 
       '../../../../src/js/components/icons/status/CriticalStatus';
import CSSClassnames from '../../../../src/js/utils/CSSClassnames';

const STATUS_ICON = CSSClassnames.STATUS_ICON;

test('loads a critical status icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(CriticalStatus));
  const criticalIcon = shallowRenderer.getRenderOutput();
  
  if (criticalIcon.props.className.indexOf(`${STATUS_ICON}-critical`) > -1) {
    t.pass('Icon has critical status  class');
  } else {
    t.fail('Icon does not have critical status  class');
  }   
});

test('loads a critical status icon with custom class applied', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(CriticalStatus, {
    className:'custom-class'
  }));
  const criticalIcon = shallowRenderer.getRenderOutput();
  
  if (criticalIcon.props.className.indexOf('custom-class') > -1) {
    t.pass('Critical Icon has custom class applied');
  } else {
    t.fail('Critical Icon does not have custom class applied');
  }   
});
