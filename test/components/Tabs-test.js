// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Tabs from '../../src/js/components/Tabs';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TABS;

test('loads a basic Tabs', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Tabs));
  const tabsElement = shallowRenderer.getRenderOutput();

  if (tabsElement.props.role.indexOf('tablist') > -1) {
    t.pass('Tabs has role');
  } else {
    t.fail('Tabs does not have role');
  }

  if (tabsElement.props.children[0].props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Tabs has class');
  } else {
    t.fail('Tabs does not have class');
  }
});
