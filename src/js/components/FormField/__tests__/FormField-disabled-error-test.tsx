// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import React from 'react';

import { FormField } from '..';
import { Form } from '../../Form';
import { Grommet } from '../../Grommet';
import { TextInput } from '../../TextInput';

// A disabled FormField should suppress its error consistently, whether or not
// it is inside a Form. Inside a Form this has always been the case, since
// Form's useFormField() resolves the error as `disabled ? undefined : error`.
// The default FormContext useFormField() needs to behave the same way.
describe('FormField disabled error', () => {
  test('outside of a Form, a disabled FormField suppresses the error', () => {
    render(
      <Grommet>
        <FormField htmlFor="disabled-outside" disabled error="Invalid value">
          <TextInput id="disabled-outside" name="disabled-outside" />
        </FormField>
      </Grommet>,
    );

    expect(screen.queryByText('Invalid value')).toBeNull();
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  test('inside a Form, a disabled FormField suppresses the error', () => {
    render(
      <Grommet>
        <Form>
          <FormField
            htmlFor="disabled-inside"
            name="disabled-inside"
            disabled
            error="Invalid value"
          >
            <TextInput id="disabled-inside" name="disabled-inside" />
          </FormField>
        </Form>
      </Grommet>,
    );

    expect(screen.queryByText('Invalid value')).toBeNull();
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  test('outside of a Form, an enabled FormField still shows the error', () => {
    render(
      <Grommet>
        <FormField htmlFor="enabled-outside" error="Invalid value">
          <TextInput id="enabled-outside" name="enabled-outside" />
        </FormField>
      </Grommet>,
    );

    expect(screen.getByText('Invalid value')).toBeTruthy();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('inside a Form, an enabled FormField still shows the error', () => {
    render(
      <Grommet>
        <Form>
          <FormField
            htmlFor="enabled-inside"
            name="enabled-inside"
            error="Invalid value"
          >
            <TextInput id="enabled-inside" name="enabled-inside" />
          </FormField>
        </Form>
      </Grommet>,
    );

    expect(screen.getByText('Invalid value')).toBeTruthy();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('re-enabling the field reveals a still supplied error', () => {
    const { rerender } = render(
      <Grommet>
        <FormField htmlFor="reenabled" disabled error="Invalid value">
          <TextInput id="reenabled" name="reenabled" />
        </FormField>
      </Grommet>,
    );

    expect(screen.queryByText('Invalid value')).toBeNull();
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');

    rerender(
      <Grommet>
        <FormField htmlFor="reenabled" disabled={false} error="Invalid value">
          <TextInput id="reenabled" name="reenabled" />
        </FormField>
      </Grommet>,
    );

    expect(screen.getByText('Invalid value')).toBeTruthy();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });
});
