// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Heading from '../../src/js/components/Heading';

describe('Heading', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Heading>Testing</Heading>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct strong=true and align="center" rendering', () => {
    const component = renderer.create(
      <Heading strong={true} align='center'>Testing</Heading>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct size="large" and uppercase=true rendering', () => {
    const component = renderer.create(
      <Heading size='large' uppercase={true}>Testing</Heading>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct margin="small" and className rendering', () => {
    const component = renderer.create(
      <Heading margin='small' className='testing'>Testing</Heading>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
