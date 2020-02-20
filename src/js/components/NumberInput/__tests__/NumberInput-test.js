import 'jest-styled-components';
import 'regenerator-runtime/runtime';

import { cleanup, render } from '@testing-library/react';

import React from 'react';
import { NumberInput } from '..';
import { createPortal } from '../../../utils/portal';

describe('NumberInput', () => {
  beforeEach(createPortal);
  afterEach(cleanup);

  test('basic', () => {
    const { container } = render(<NumberInput name="item" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
