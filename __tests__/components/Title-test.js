// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Title from '../../src/js/components/Title';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Title', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Title>Testing</Title>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct className rendering', () => {
    const component = renderer.create(
      <Title className='testing'>Testing</Title>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct onClick rendering', () => {
    const onTitleClick = jest.fn();
    const component = renderer.create(
      <Title onClick={onTitleClick}>Testing</Title>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(onTitleClick).toBeCalled();
  });
});
