// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import SunBurst from '../../src/js/components/SunBurst';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('SunBurst', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <SunBurst data={[
        {
          "value": 50,
          "children": [
            {
              "value": 20,
              "total": 10,
              "children": [{"value": 5}, {"value": 1}]
            },
            {"value": 20},
            {"value": 10}
          ]
        },
        {"value": 30, "children": [{"value": 15}, {"value": 10}, {"value": 5}]},
        {"value": 20, "children": [{"value": 10}, {"value": 7}, {"value": 3}]}
      ]} size="xlarge" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
