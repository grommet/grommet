// (C) Copyright 2014-2017 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import HotSpots from '../../src/js/components/chart/HotSpots';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Hotspots', () => {
  it('renders with correct widths for regular data', () => {
    const component = renderer.create(
      <HotSpots
        count={0}
        normalizedValues={[
          [1, 2, 3]
        ]}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with correct widths for data with beginning gaps', () => {
    const component = renderer.create(
      <HotSpots
        count={0}
        normalizedValues={[
          [undefined, 1, 2]
        ]}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with correct widths for data with end gaps', () => {
    const component = renderer.create(
      <HotSpots
        count={0}
        normalizedValues={[
          [1, 2, undefined]
        ]}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with correct widths for data with middle gaps', () => {
    const component = renderer.create(
      <HotSpots
        count={0}
        normalizedValues={[
          [0, undefined, undefined, undefined, 1, undefined, undefined, 2]
        ]}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with correct div widths for empty data', () => {
    const component = renderer.create(
      <HotSpots
        count={0}
        normalizedValues={[
          []
        ]}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with correct widths for merged data with beginning gaps', () => {
    const component = renderer.create(
      <HotSpots
        count={0}
        normalizedValues={[
          [undefined, 2, 5, 56, 1, 6],
          [undefined, 40, undefined, 6, 7, 1]
        ]}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with correct widths for merged data with end gaps', () => {
    const component = renderer.create(
      <HotSpots
        count={0}
        normalizedValues={[
          [2, 5, 56, 1, 6],
          [40, undefined, 6, 7, 1, undefined]
        ]}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with correct div widths for merged data without gaps', () => {
    const component = renderer.create(
      <HotSpots
        count={0}
        normalizedValues={[
          [40, 43, 6, 7, 1, 0],
          [2, 5, 56, 1, 6]
        ]}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with correct widths for merged data with middle gaps', () => {
    const component = renderer.create(
      <HotSpots
        count={0}
        normalizedValues={[
        [undefined, 1],
	      [undefined, undefined, undefined, undefined]
        ]}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with correct widths for merged data with all gaps', () => {
    const component = renderer.create(
      <HotSpots
        count={0}
        normalizedValues={[
        [undefined, undefined],
	      [undefined, undefined, undefined, undefined]
        ]}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with correct widths for merged data from multiple arrays', () => {
    const component = renderer.create(
      <HotSpots
        count={0}
        normalizedValues={[
          [2, 5, undefined, undefined, 1, 6],
          [40, undefined, undefined, undefined, 7, 1, undefined],
          [8, undefined, undefined, 29, undefined, undefined, undefined, 1]
        ]}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
