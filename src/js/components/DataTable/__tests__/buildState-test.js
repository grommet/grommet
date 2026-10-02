// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { set } from '../buildState';

describe('buildState', () => {
  test('set() creates an array for a numeric path segment', () => {
    expect(set({}, 'a.0', 'x')).toEqual({ a: ['x'] });
    expect(set({}, 'a.0.b', 'x')).toEqual({ a: [{ b: 'x' }] });
  });

  test('set() creates an object for a non-numeric path segment', () => {
    expect(set({}, 'a.b', 'x')).toEqual({ a: { b: 'x' } });
  });
});
