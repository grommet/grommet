// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Quote from '../../src/js/components/Quote';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Quote', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Quote>Testing</Quote>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
