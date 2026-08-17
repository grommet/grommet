// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as Components from '..';

test('Components loads', () => {
  expect(Components).toMatchSnapshot();
});
