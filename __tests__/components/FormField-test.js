// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import FormField from '../../src/js/components/FormField';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('FormField', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <FormField label="Item 1" htmlFor="item1">
        <input id="item1" type="text" />
      </FormField>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
