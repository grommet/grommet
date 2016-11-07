// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Spinning from '../../../src/js/components/icons/Spinning';

describe('Spinning', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Spinning />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct small=true rendering', () => {
    const component = renderer.create(
      <Spinning small={true} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct className rendering', () => {
    const component = renderer.create(
      <Spinning className='testing' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has microdata properties rendering', () => {
    const component = renderer.create(
      <Spinning itemScope={true} itemType="http://schema.org/Article"
        itemProp="test"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
