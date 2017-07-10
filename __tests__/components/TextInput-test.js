// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import TextInput from '../../src/js/components/TextInput';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('TextInput', () => {
  it('has correct default options', () => {
    const component = renderer.create(
       <TextInput id="item1" name="item-1" value="one" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('can set autocomplete', () => {
    expect(
      renderer.create(<TextInput autoComplete="on" />).toJSON()
    ).toMatchSnapshot();
  });
});
