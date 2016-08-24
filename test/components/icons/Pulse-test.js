import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Pulse from '../../../src/js/components/icons/Pulse';
import CSSClassnames from '../../../src/js/utils/CSSClassnames';

const PULSE = CSSClassnames.PULSE;

test('loads a pulse icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Pulse));
  const pulseIcon = shallowRenderer.getRenderOutput();
  
  if (pulseIcon.props.className.indexOf(`${PULSE}`) > -1) {
    t.pass('Pulse icon has pulse class');
  } else {
    t.fail('Pulse icon does not pulse class');
  }    
});

test('loads a pulse icon with a custom class', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Pulse, {
    className:'custom-class'
  }));
  const pulseIcon = shallowRenderer.getRenderOutput();

  if (pulseIcon.props.className.indexOf('custom-class') > -1) {
    t.pass('Pulse icon has custom applied class');
  } else {
    t.fail('Pulse icon does not custom applied class');
  }
});
