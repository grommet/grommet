import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Label from '../../../../src/js/components/icons/status/Label';
import CSSClassnames from '../../../../src/js/utils/CSSClassnames';

const STATUS_ICON = CSSClassnames.STATUS_ICON;

test('loads a label icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Label));
  const labelIcon = shallowRenderer.getRenderOutput();
  
  if (labelIcon.props.className.indexOf(`${STATUS_ICON}-label`) > -1) {
    t.pass('Icon has label class');
  } else {
    t.fail('Icon does not have label class');
  }   
});

test('loads a label icon with custom class applied', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Label, {
    className:'custom-class'
  }));
  const labelIcon = shallowRenderer.getRenderOutput();
  
  if (labelIcon.props.className.indexOf('custom-class') > -1) {
    t.pass('Label icon has custom class applied');
  } else {
    t.fail('Label icon does not have custom class applied');
  }   
});
