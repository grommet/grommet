// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import CriticalStatus from
  '../../../../src/js/components/icons/status/CriticalStatus';

describe('CriticalStatus', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <CriticalStatus />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct className rendering', () => {
    const component = renderer.create(
      <CriticalStatus className='testing' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
