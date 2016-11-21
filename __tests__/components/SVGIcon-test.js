// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import SVGIcon from '../../src/js/components/SVGIcon';

describe('SVGIcon', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <SVGIcon>Testing</SVGIcon>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
