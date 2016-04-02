// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import WorldMap from '../../src/js/components/WorldMap';

describe('Grommet WorldMap', function() {
  it('loads a WorldMap', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(WorldMap, {
      series: [{continent: 'Australia'}]
    }));
    const worldMapElement = shallowRenderer.getRenderOutput();

    expect(worldMapElement.props.className).to.contain('world-map');
  });

});
