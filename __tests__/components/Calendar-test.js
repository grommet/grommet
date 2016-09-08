// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Calendar from '../../src/js/components/Calendar';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Calendar', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Calendar id="item1" name="item-1" value="2015-06-03" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
