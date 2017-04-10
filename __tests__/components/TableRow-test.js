// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import TableRow from '../../src/js/components/TableRow';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('TableRow', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <TableRow custom={true} disabled={true} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
