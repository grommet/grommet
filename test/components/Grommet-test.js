// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Grommet from '../../src/js/components/Grommet';

const CLASS_ROOT = "grommet";

test('loads a Grommet', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleGrommet = (
    <Grommet>Sample Grommet</Grommet>
  );
  shallowRenderer.render(sampleGrommet);
  const grommetElement = shallowRenderer.getRenderOutput();
  const grommetValue = grommetElement.props.children;
  
  if (grommetElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Grommet has grommet class');
  } else {
    t.fail('Grommet does not have grommet class');
  }

  t.equal(
    grommetValue, 'Sample Grommet', 'Grommet is Sample Grommet'
  );  
});
