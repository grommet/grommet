// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

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
  it('has correct rendering when size=small', () => {
    const component = renderer.create(
      <Spinning size="small" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct rendering when size=medium', () => {
    const component = renderer.create(
      <Spinning size="medium" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct rendering when size=large', () => {
    const component = renderer.create(
      <Spinning size="large" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct rendering when size=xlarge', () => {
    const component = renderer.create(
      <Spinning size="xlarge" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct rendering when size=huge', () => {
    const component = renderer.create(
      <Spinning size="huge" />
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
