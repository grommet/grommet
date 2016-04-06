// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import WorldMap from '../../src/js/components/WorldMap';

test('loads a WorldMap', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(WorldMap, {
    series: [{continent: 'Australia'}]
  }));
  const worldMapElement = shallowRenderer.getRenderOutput();

  if (worldMapElement.props.className.indexOf('world-map') > -1) {
    t.pass('WorldMap has class');
  } else {
    t.fail('WorldMap does not have class');
  }
});
