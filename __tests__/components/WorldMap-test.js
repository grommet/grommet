// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import WorldMap from '../../src/js/components/WorldMap';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('WorldMap', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <WorldMap series={[{continent: 'Australia'}]} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders place', () => {
    const component = renderer.create(
      <WorldMap series={[
        {
          place: [34.052234,-118.243685], // lat,lon
          label: 'Los Angeles',
          colorIndex: 'accent-2',
          id: 'los-angeles',
          flag: <span>Los Angeles</span>,
          onClick: () => {},
          onHover: () => {}
        }
      ]} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders place zoomed', () => {
    const component = renderer.create(
      <WorldMap series={[
        {
          place: [34.052234,-118.243685], // lat,lon
          label: 'Los Angeles',
          colorIndex: 'accent-2',
          id: 'los-angeles',
          flag: <span>Los Angeles</span>,
          onClick: () => {},
          onHover: () => {}
        }
      ]}
      zoom={true} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
