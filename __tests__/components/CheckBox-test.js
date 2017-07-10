// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import CheckBox from '../../src/js/components/CheckBox';
import renderer from 'react-test-renderer';

describe('CheckBox', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <CheckBox id="test" label="Test CheckBox"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct checked=true rendering', () => {
    const component = renderer.create(
      <CheckBox id="test" checked={true} label="Test CheckBox"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct disabled=true rendering', () => {
    const component = renderer.create(
      <CheckBox id="test" disabled={true} label="Test CheckBox"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct reverse=true rendering', () => {
    const component = renderer.create(
      <CheckBox id="test" reverse={true} label="Test CheckBox"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct toggle=true rendering', () => {
    const component = renderer.create(
      <CheckBox id="test" toggle={true} label="Test CheckBox"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct className rendering', () => {
    const component = renderer.create(
      <CheckBox id="test" label="Test CheckBox" className="testing"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
