// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import NumberInput from '../../src/js/components/NumberInput';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('NumberInput', () => {
  it('has correct default options', () => {
    const component = renderer.create(
       <NumberInput id="item2" name="item2" value={10} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
