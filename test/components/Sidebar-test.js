// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Sidebar from '../../src/js/components/Sidebar';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.SIDEBAR;

test('loads a fixed and large sized Sidebar', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleSidebar = (
    <Sidebar fixed={true} size="large">Sample Sidebar</Sidebar>
  );
  shallowRenderer.render(sampleSidebar);
  const sidebarElement = shallowRenderer.getRenderOutput();
  const sidebar = sidebarElement.props.children;

  if (sidebarElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Sidebar has sidebar class');
  } else {
    t.fail('Sidebar does not have sidebar class');
  }  

  t.equal(
    sidebar, 'Sample Sidebar', 'Sidebar is Sample Sidebar'
  );
});
