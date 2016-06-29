// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import SVGIcon from '../../src/js/components/SVGIcon';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CONTROL_ICON = CSSClassnames.CONTROL_ICON;

test('loads a default SVGIcon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(SVGIcon));
  const iconElement = shallowRenderer.getRenderOutput();

  if (iconElement.props.className.indexOf(CONTROL_ICON) > -1) {
    t.pass('Icon has control icon class');
  } else {
    t.fail('Icon does not have control icon class');
  }
});
