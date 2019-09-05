import React from 'react';
import 'jest-styled-components';
import { render } from '@testing-library/react';

import { FileInput } from '..';

describe('FileInput', () => {
  test('basic', () => {
    const { container } = render(<FileInput name="file" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('multiple', () => {
    const { container } = render(<FileInput name="file" multiple />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('accept', () => {
    const { container } = render(<FileInput name="file" accept="image/*" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const { container } = render(<FileInput name="file" disabled />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
