// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { AnnounceContext } from '../../../contexts/AnnounceContext';
import { Grommet } from '../../Grommet';
import { DataTable } from '../../DataTable';
import { Data } from '..';

const DATA = [
  { name: 'aa', enabled: true },
  { name: 'bb', enabled: false },
  { name: 'cc', enabled: true },
];

// Regression test for a bug where the "selected" announcement never fired.
// DataTable reports selection to Data's context as a number
// (select.length), while Data's own local `selected` state starts out as
// an array ([]). The announce effect must handle both shapes.
test('announces the selected count once rows are selected via DataTable', () => {
  const announce = jest.fn();

  const App = () => {
    const [select, setSelect] = useState<(string | number)[]>([]);
    return (
      <AnnounceContext.Provider value={announce}>
        <Grommet>
          <Data data={DATA}>
            <DataTable select={select} onSelect={setSelect} />
          </Data>
        </Grommet>
      </AnnounceContext.Provider>
    );
  };
  render(<App />);

  fireEvent.click(screen.getByLabelText('select all'));

  expect(
    announce.mock.calls.some(([message]) => /3 selected/i.test(String(message))),
  ).toBe(true);
});
