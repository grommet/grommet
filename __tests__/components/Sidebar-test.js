// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Sidebar from '../../src/js/components/Sidebar';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Sidebar', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Sidebar>Testing</Sidebar>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct size="large" and fixed=true rendering', () => {
    const component = renderer.create(
      <Sidebar size="large" fixed={true}>Testing</Sidebar>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
