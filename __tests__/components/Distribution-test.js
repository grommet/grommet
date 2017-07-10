// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Distribution from '../../src/js/components/Distribution';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Distribution', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Distribution series={[
        {"label": "First", "value": 40, "colorIndex": "graph-1"},
        {"label": "Second", "value": 30, "colorIndex": "accent-2"},
        {"label": "Third", "value": 20, "colorIndex": "unset"},
        {"label": "Fourth", "value": 10, "colorIndex": "graph-1"}
      ]} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
