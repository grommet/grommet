// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Columns from '../../src/js/components/Columns';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Columns', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Columns>
        <span>test1</span>
        <span>test2</span>
      </Columns>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
