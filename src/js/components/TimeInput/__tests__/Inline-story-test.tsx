// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Grommet } from '../../Grommet';
import { Inline } from '../stories/Inline.stories';

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('Inline story displays the picker and keeps selections controlled', async () => {
  const user = userEvent.setup();
  render(
    <Grommet>
      <Inline />
    </Grommet>,
  );

  const hours = screen.getByRole('listbox', { name: 'hour' });
  const minutes = screen.getByRole('listbox', { name: 'minute' });
  expect(
    within(hours).getByRole('option', { name: '13 hours' }),
  ).toHaveAttribute('aria-selected', 'true');
  expect(
    within(minutes).getByRole('option', { name: '30 minutes' }),
  ).toHaveAttribute('aria-selected', 'true');
  expect(
    screen.queryByRole('button', { name: 'Choose time' }),
  ).not.toBeInTheDocument();

  await user.click(within(hours).getByRole('option', { name: '14 hours' }));
  await user.click(within(minutes).getByRole('option', { name: '45 minutes' }));

  expect(
    within(hours).getByRole('option', { name: '14 hours' }),
  ).toHaveAttribute('aria-selected', 'true');
  expect(
    within(minutes).getByRole('option', { name: '45 minutes' }),
  ).toHaveAttribute('aria-selected', 'true');
});
