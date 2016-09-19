// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Notification from '../../src/js/components/Notification';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Notification', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Notification message="You will need a tray. The food is hot." />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with status option given', () => {
    const component = renderer.create(
      <Notification status="warning"
        message="You will need a tray. The food is hot." />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with closer set to true', () => {
    const component = renderer.create(
      <Notification closer
        message="You will need a tray. The food is hot." />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with closer set to true', () => {
    const component = renderer.create(
      <Notification flush
        message="You will need a tray. The food is hot." />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with padding set', () => {
    const component = renderer.create(
      <Notification padding={{ horizontal: 'large', vertical: 'large' }}
        message="You will need a tray. The food is hot." />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with a padding', () => {
    const component = renderer.create(
      <Notification flush closer status="critical"
        padding={{ horizontal: 'medium', vertical: 'medium' }}
        message="You will need a tray. The food is hot." />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
