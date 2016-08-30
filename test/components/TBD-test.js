// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import TBD from '../../src/js/components/TBD';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TBD;

test('loads a TBD', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(TBD));
  const tbdElement = shallowRenderer.getRenderOutput();
  const tbd = tbdElement.props.children;

  if (tbdElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('TBD has TBD class');
  } else {
    t.fail('TBD does not have TBD class');
  }  

  t.equal(
    tbd, 'TBD', 'TBD has content TBD'
  );
});
