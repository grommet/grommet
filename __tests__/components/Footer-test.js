// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Footer from '../../src/js/components/Footer';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Footer', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Footer>Testing</Footer>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders a class name', () => {
    const component = renderer.create(
      <Footer className="test">Testing</Footer>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders microdata properties', () => {
    const component = renderer.create(
      <Footer itemScope={true} itemType="http://schema.org/WPFooter"
        itemProp="test">Testing</Footer>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
