// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Columns from '../../src/js/components/Columns';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Columns', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Columns>
        <span>test1</span>
        <span>test2</span>
      </Columns>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correct className', () => {
    const component = renderer.create(
      <Columns className="test">
        <span>test1</span>
        <span>test2</span>
      </Columns>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders microdata properties', () => {
    const component = renderer.create(
      <Columns itemScope={true} itemType="http://schema.org/Article"
        itemProp="test">
        <span>test1</span>
        <span>test2</span>
      </Columns>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders masonry properties', () => {
    const component = renderer.create(
      <Columns masonry={true}>
        <span>test1</span>
        <span>test2</span>
      </Columns>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
