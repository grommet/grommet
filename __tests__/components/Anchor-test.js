// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Anchor from '../../src/js/components/Anchor';

import FakeIcon from '../mocks/FakeIcon';

describe('Anchor', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Anchor href='test' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct primary=true rendering', () => {
    const component = renderer.create(
      <Anchor href='test' primary={true} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct disabled=true rendering', () => {
    const component = renderer.create(
      <Anchor href='test' disabled={true} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct icon rendering', () => {
    const component = renderer.create(
      <Anchor icon={<FakeIcon />} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct icon as a child rendering', () => {
    const component = renderer.create(
      <Anchor><FakeIcon /></Anchor>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct text as a child rendering', () => {
    const component = renderer.create(
      <Anchor>test</Anchor>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct icon and label rendering', () => {
    const component = renderer.create(
      <Anchor icon={<FakeIcon />} label='test' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('calls onClick after rendering', () => {
    const onAnchorClick = jest.fn();
    const component = renderer.create(
      <Anchor href='test' onClick={onAnchorClick} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(onAnchorClick).toBeCalled();
  });
  it('preserves id after rendering', () => {
    const component = renderer.create(
      <Anchor id='test' href='test' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
