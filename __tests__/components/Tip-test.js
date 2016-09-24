// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Tip from '../../src/js/components/Tip';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('SkipLinks', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <div>
        <div id="test-target"></div>
        <Tip onClose={(e) => e} target="test-target" />
      </div>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with a different colorIndex value', () => {
    const component = renderer.create(
      <div>
        <div id="test-target"></div>
        <Tip colorIndex="brand"
          onClose={(e) => e} target="test-target" />
      </div>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
