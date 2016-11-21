// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Video from '../../src/js/components/Video';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Video', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Video>
        <source src="/video/test.mp4" type="video/mp4" />
      </Video>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('transfers arbitrary props', () => {
    const component = renderer.create(
      <Video data-flavor="coconut">
        <source src="/video/test.mp4" type="video/mp4" />
      </Video>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
