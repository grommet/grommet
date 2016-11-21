// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Collapsible from '../../src/js/components/Collapsible';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Collapsible', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Collapsible />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
