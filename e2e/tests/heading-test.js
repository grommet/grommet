/* eslint-disable no-undef */
import { screen } from '@testing-library/testcafe';

fixture('TextInput place holder').page(`http://localhost:8080/`);

test('check heading', async (t) => {
  const heading = screen.getByRole('heading', { level: 1 });
  await t.expect(heading).exists;
});
