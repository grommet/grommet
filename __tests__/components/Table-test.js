// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Table from '../../src/js/components/Table';
import TableHeader from '../../src/js/components/Table';
import TableRow from '../../src/js/components/Table';

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

  it('has mismatched headers and body columns', () => {
    // Test covers case with one headerCell, but two row cells. Console logs
    // error message, but nothing to assert.
    const component = renderer.create(
      <Table>
        <TableHeader labels={['one']} />
        <tbody>
        <tr>
          <td>
            one
          </td>
          <td>
            two - one too many
          </td>
        </tr>
        </tbody>
      </Table>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
