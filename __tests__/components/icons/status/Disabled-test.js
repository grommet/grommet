// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Disabled from
  '../../../../src/js/components/icons/status/Disabled';

describe('Disabled', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Disabled />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct className rendering', () => {
    const component = renderer.create(
      <Disabled className='testing' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
