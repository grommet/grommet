import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Blank from '../../../../src/js/components/icons/status/Blank';
import CSSClassnames from '../../../../src/js/utils/CSSClassnames';

const STATUS_ICON = CSSClassnames.STATUS_ICON;

test('loads a blank icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Blank));
  const blankIcon = shallowRenderer.getRenderOutput();
  
  if (blankIcon.props.className.indexOf(`${STATUS_ICON}-blank`) > -1) {
    t.pass('Icon has blank class');
  } else {
    t.fail('Icon does not have blank class');
  }   
});

test('loads a blank icon with custom class applied', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Blank, {
    className:'custom-class'
  }));
  const blankIcon = shallowRenderer.getRenderOutput();
  
  if (blankIcon.props.className.indexOf('custom-class') > -1) {
    t.pass('Blank icon has custom class applied');
  } else {
    t.fail('Blank icon does not have custom class applied');
  }   
});
