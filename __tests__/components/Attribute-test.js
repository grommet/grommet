// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Attribute from '../../src/js/components/Attribute';

describe('Attribute', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Attribute label='testLabel'>testContent</Attribute>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
