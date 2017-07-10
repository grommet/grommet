// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Select from '../../src/js/components/Select';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Select', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Select options={['one', 'two']} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts initial value', () => {
    const component = renderer.create(
      <Select options={['one', 'two']} value="one" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('inline', () => {
    const component = renderer.create(
      <Select inline={true} options={['one', 'two']} value={['one']} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('inline + multiple', () => {
    const component = renderer.create(
      <Select inline={true} multiple={true} options={['one', 'two']}
        value={['one']} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
