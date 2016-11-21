// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Grommet from '../../../src/js/components/icons/Grommet';

describe('Grommet', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Grommet />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct small=true rendering', () => {
    const component = renderer.create(
      <Grommet small={true} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct size="large" rendering', () => {
    const component = renderer.create(
      <Grommet size='large' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct size="xlarge" rendering', () => {
    const component = renderer.create(
      <Grommet size='xlarge' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct className rendering', () => {
    const component = renderer.create(
      <Grommet className='testing' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
