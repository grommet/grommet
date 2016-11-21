// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Split from '../../src/js/components/Split';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Split', () => {
  it('has correct default options', () => {
    const component = renderer.create(
       <Split><div>left</div><div>right</div></Split>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
