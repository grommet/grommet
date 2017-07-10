// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Paragraph from '../../src/js/components/Paragraph';

describe('Paragraph', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Paragraph data-flavor="coconut">Testing</Paragraph>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct size="large" options', () => {
    const component = renderer.create(
      <Paragraph size="large">Testing</Paragraph>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
