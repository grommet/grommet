// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Meter from '../../src/js/components/Meter';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Meter', () => {
  it('has correct default options', () => {
    const component = renderer.create(
       <Meter value={40} label={false} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
