// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Warning from
  '../../../../src/js/components/icons/status/Warning';

describe('Warning', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Warning />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct className rendering', () => {
    const component = renderer.create(
      <Warning className='testing' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
