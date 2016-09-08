// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Footer from '../../src/js/components/Footer';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Footer', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Footer>Testing</Footer>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
