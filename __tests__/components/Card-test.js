// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Card from '../../src/js/components/Card';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Card', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Card thumbnail="http://grommet.github.io/img/carousel-1.png"
        label="Featured Post"
        heading="The Key Steps to Reducing Software Spend" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with a non-default colorIndex', () => {
    const component = renderer.create(
      <Card colorIndex="light-2" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders a header with the set size', () => {
    const component = renderer.create(
      <Card label="Hello from Grommet" textSize="large" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when reverse', () => {
    const component = renderer.create(
      <Card label="Hello from Grommet" reverse={true} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when the direction is set to row', () => {
    const component = renderer.create(
      <Card label="Hello from Grommet" direction="row" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when the headingStrong is false', () => {
    const component = renderer.create(
      <Card label="Hello from Grommet" headingStrong={false} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
