// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Timestamp from '../../src/js/components/Timestamp';

describe('Timestamp', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Timestamp value='4/7/2015 10:00:01 am' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays second', () => {
    const component = renderer.create(
      <Timestamp value='4/7/2015 10:00:01 am' seconds={true}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
