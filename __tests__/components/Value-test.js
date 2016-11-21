// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Value from '../../src/js/components/Value';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Value', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Value value={75} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct units=% rendering', () => {
    const component = renderer.create(
      <Value value={75} units='%' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct label rendering', () => {
    const component = renderer.create(
      <Value value={75} label='testing' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct size="large" rendering', () => {
    const component = renderer.create(
      <Value value={75} size='large' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct colorIndex rendering', () => {
    const component = renderer.create(
      <Value value={75} colorIndex='neutral-1' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct className rendering', () => {
    const component = renderer.create(
      <Value value={75} className='testing' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct active=true rendering', () => {
    const component = renderer.create(
      <Value value={75} active={true} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct onClick rendering', () => {
    const onValueClick = jest.fn();
    const component = renderer.create(
      <Value value={75} onClick={onValueClick} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(onValueClick).toBeCalled();
  });
});
