// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Status from '../../../src/js/components/icons/Status';

describe('Status', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Status />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct value="blank" rendering', () => {
    const component = renderer.create(
      <Status value='blank' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct value="critical" rendering', () => {
    const component = renderer.create(
      <Status value='critical' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct value="disabled" rendering', () => {
    const component = renderer.create(
      <Status value='disabled' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct value="label" rendering', () => {
    const component = renderer.create(
      <Status value='label' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct value="ok" rendering', () => {
    const component = renderer.create(
      <Status value='ok' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct value="warning" rendering', () => {
    const component = renderer.create(
      <Status value='warning' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct className rendering', () => {
    const component = renderer.create(
      <Status className='testing' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
