// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Table from '../../src/js/components/Table';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Table', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Table>
        <tbody>
          <tr>
            <td>
              first
            </td>
            <td>
              note 1
            </td>
          </tr>
          <tr>
            <td>
              second
            </td>
            <td>
              note 2
            </td>
          </tr>
          <tr>
            <td>
              third
            </td>
            <td>
              note 3
            </td>
          </tr>
        </tbody>
      </Table>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
