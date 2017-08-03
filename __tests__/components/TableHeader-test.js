// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import TableHeader from '../../src/js/components/TableHeader';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('TableHeader', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <TableHeader labels={['first', 'second']}
        sortIndex={0} sortAscending={true} onSort={() => {}} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts options for sorting', () => {
    const component = renderer.create(
      <TableHeader labels={['first', ['second', { sortable: false }]]}
        sortIndex={0} sortAscending={true} onSort={() => {}} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
