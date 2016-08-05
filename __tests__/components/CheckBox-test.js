// Checkbox-test.js
import React from 'react';
import Checkbox from '../../src/js/components/Checkbox';
import renderer from 'react/lib/ReactTestRenderer';

describe('Checkbox', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Checkbox id="test" label="Test Checkbox"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct checked=true rendering', () => {
    const component = renderer.create(
      <Checkbox id="test" checked={true} label="Test Checkbox"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct disabled=true rendering', () => {
    const component = renderer.create(
      <Checkbox id="test" disabled={true} label="Test Checkbox"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct reverse=true rendering', () => {
    const component = renderer.create(
      <Checkbox id="test" reverse={true} label="Test Checkbox"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct toggle=true rendering', () => {
    const component = renderer.create(
      <Checkbox id="test" toggle={true} label="Test Checkbox"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});