// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Area from '../../src/js/components/chart/Area';
import Axis from '../../src/js/components/chart/Axis';
import Base from '../../src/js/components/chart/Base';
import Chart from '../../src/js/components/chart/Chart';
import Grid from '../../src/js/components/chart/Grid';
import HotSpots from '../../src/js/components/chart/HotSpots';
import Layers from '../../src/js/components/chart/Layers';
import Line from '../../src/js/components/chart/Line';
import Marker from '../../src/js/components/chart/Marker';
import MarkerLabel from '../../src/js/components/chart/MarkerLabel';
import Value from '../../src/js/components/Value';

import { normalization } from '../../src/js/components/chart/utils-normalization';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('normalization', () => {
  it('normalize returns the proper values', () => {
    const granularity = 3;
    const inputArray = [
      [[1, 1], [4, 3]],
      [[4, 4], [7, 7]]
    ];
    const outputArray = [
      [1, 3, undefined],
      [undefined, 4, 7]
    ];
    const nTest1 = new normalization();
    expect(nTest1.normalize(inputArray, granularity).values).toEqual(outputArray);
  });

  it('normalize returns the proper values', () => {
    const granularity = 4;
    const inputArray = [
      [[4, 3]],
      [[4, 4], [8, 7]]
    ];
    const outputArray = [
      [3, undefined],
      [4, 7]
    ];
    const nTest2 = new normalization();
    expect(nTest2.normalize(inputArray, granularity).values).toEqual(outputArray);
  });

  it('has correct default options', () => {
    const component = renderer.create(
      <Chart vertical={false}>
        <Axis vertical={true} ticks={true} count={5} tickAlign="end"
          labels={
            [{"index": 2, "label": "50"}, {"index": 4, "label": "100"}]
          } />
        <Chart vertical={true}>
          <MarkerLabel count={12} index={11} label={<Value value={50} />}/>
          <Base height="medium" width="large"/>
          <Layers>
            <Grid rows={3} columns={5}/>
            <Marker colorIndex="critical" value={90}/>
            <Marker vertical={true} colorIndex="graph-2" count={12}
                    index={11}/>
            <Area values={[50, 45, 30, 35, 0, 5, 10, 15, 75, 80, 90, 100]}
                  activeIndex={11}/>
            <Line values={[100, 95, 80, 82, 75, 70, 60, 55, 0, 15, 40, 50]}
                  colorIndex="accent-1" activeIndex={11} points={true}/>
            <HotSpots count={12} activeIndex={11}/>
          </Layers>
          <Axis ticks={true} count={2}
                labels={
    [{"index": 0, "label": "2014"}, {"index": 1, "label": "2015"}]
}/>
        </Chart>
        <MarkerLabel vertical={true} colorIndex="critical" label="90%"
                     value={90}/>
      </Chart>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
