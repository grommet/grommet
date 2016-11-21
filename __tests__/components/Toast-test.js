// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Toast from '../../src/js/components/Toast';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Toast', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Toast>
        <span>
          This is a message
        </span>
      </Toast>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
