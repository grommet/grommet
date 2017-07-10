// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import OK from
  '../../../../src/js/components/icons/status/OK';

describe('OK', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <OK />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct className rendering', () => {
    const component = renderer.create(
      <OK className='testing' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
