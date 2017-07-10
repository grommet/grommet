// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Image from '../../src/js/components/Image';

describe('Image', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Image src="test.png" data-flavor="coconut" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct size="thumb" rendering', () => {
    const component = renderer.create(
      <Image src='test.png' size='thumb' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct full="horizontal" and caption rendering', () => {
    const component = renderer.create(
      <Image src='test.png' caption='Testing' full='horizontal' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
