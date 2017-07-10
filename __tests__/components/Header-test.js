// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../../src/js/components/Header';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Header', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Header>
        testing
      </Header>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
