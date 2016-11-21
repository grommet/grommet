// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Markdown from '../../src/js/components/Markdown';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Markdown', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Markdown content='test'
        components={{
          p: { props: { className: 'testing', size: 'large' } }
        }} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
