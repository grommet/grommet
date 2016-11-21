// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Label from '../../src/js/components/Label';

describe('Label', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Label data-flavor="coconut">Testing</Label>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct uppercase=true rendering', () => {
    const component = renderer.create(
      <Label uppercase={true}>Testing</Label>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct size="small" and margin="large" rendering', () => {
    const component = renderer.create(
      <Label size="small" margin="large">Testing</Label>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
