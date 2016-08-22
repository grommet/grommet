import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Spinning from '../../../src/js/components/icons/Spinning';
import CSSClassnames from '../../../src/js/utils/CSSClassnames';

const SPINNING = CSSClassnames.SPINNING;

test('loads a spinning icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Spinning));
  const spinningIcon = shallowRenderer.getRenderOutput();
  
  if (spinningIcon.props.className.indexOf(`${SPINNING}`) > -1) {
    t.pass('Spinning icon has spinning class');
  } else {
    t.fail('Spinning icon does not spinning class');
  }    
});

test('loads a small sized spinning icon with custom class', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Spinning, {
    small:true,
    className:'custom-class'
  }));
  const spinningIcon = shallowRenderer.getRenderOutput();
  
  if (spinningIcon.props.className.indexOf(`${SPINNING}--small`) > -1) {
    t.pass('Spinning icon has small size class');
  } else {
    t.fail('Spinning icon does not small size class');
  } 
  
  if (spinningIcon.props.className.indexOf('custom-class') > -1) {
    t.pass('Spinning icon has custom applied class');
  } else {
    t.fail('Spinning icon does not custom applied class');
  }   
});
