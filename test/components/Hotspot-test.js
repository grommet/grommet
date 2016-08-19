// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Hotspot from '../../src/js/components/Hotspot';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.HOTSPOT;

test('loads a Hotspot', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Hotspot, {
    
  }));
  const hotspotElement = shallowRenderer.getRenderOutput();

  if (hotspotElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Hotspot has class');
  } else {
    t.fail('Hotspot does not have class');
  }
});
