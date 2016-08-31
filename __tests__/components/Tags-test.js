// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Tags from '../../src/js/components/Tags';
import Tag from '../../src/js/components/Tag';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Tags', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Tags className="custom-class">
        <Tag label="First" />
        <Tag label="Second" />
        <Tag label="Third" />
      </Tags>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct className rendering', () => {
    const component = renderer.create(
      <Tags className="testing">
        <Tag label="First" />
        <Tag label="Second" />
        <Tag label="Third" />
      </Tags>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
