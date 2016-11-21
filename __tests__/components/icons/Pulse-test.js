// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Pulse from '../../../src/js/components/icons/Pulse';

describe('Pulse', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Pulse />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct className rendering', () => {
    const component = renderer.create(
      <Pulse className='testing' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has microdata properties rendering', () => {
    const component = renderer.create(
      <Pulse itemScope={true} itemType="http://schema.org/gameTip"
        itemProp="test" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
