// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import FileUpload from '../../src/js/components/FileUpload';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('FileUpload', () => {

  it('has correct default options', () => {
    const component = renderer.create(
      <FileUpload />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should create a snapshot with label props', () => {
    const component = renderer.create(
      <FileUpload label="Testing" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should create a snapshot with preview prop set to false', () => {
    const component = renderer.create(
      <FileUpload preview={false} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should create a snapshot with multiple prop set to true', () => {
    const component = renderer.create(
      <FileUpload multiple={true} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(
    'should create a snapshot with full screen drop target set to true',
    () =>  {
      const component = renderer.create(
      <FileUpload fullDropTarget={true} />
    );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

  it('accepts a function as onDOMChange prop', () => {
    const component = renderer.create(
      <FileUpload onDOMChange={jest.fn()} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
