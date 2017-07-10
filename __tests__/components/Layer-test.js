// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Layer from '../../src/js/components/Layer';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Layer', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Layer>
        <h1>
          This is a Layer
        </h1>
      </Layer>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
