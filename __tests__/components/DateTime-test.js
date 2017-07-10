// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import DateTime from '../../src/js/components/DateTime';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('DateTime', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <DateTime value='4/7/2015 10:00 am' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('transfers arbitrary props', () => {
    const component = renderer.create(
      <DateTime value='4/7/2015 10:00 am' data-flavor='coconut' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
