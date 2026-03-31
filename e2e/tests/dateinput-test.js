import { screen } from '@testing-library/testcafe';

fixture('DateInput').page(`http://localhost:8080/`);

test('onBlur validation with a drop component', async (t) => {
  await t.click(screen.getByRole('button', { name: 'Calendar' }));
  // validation shouldn't trigger yet
  await t.expect(screen.queryAllByText('required').exists).notOk();
  // close DateInput
  await t.pressKey('esc');
  await t.click(screen.getByRole('button', { name: 'Submit' }));
  // validation should trigger
  await t.expect(screen.queryAllByText('required')).exists;
});

test('DateInput range onBlur validation', async (t) => {
  // open DateInput
  await t.click(screen.getByRole('button', { name: 'Calendar' }));
  await t.click(screen.getByRole('button', { name: 'Sun Jan 01 2023' }));
  await t.click(screen.getByRole('button', { name: 'Go to February 2023' }));
  await t.click(screen.getByRole('button', { name: 'Mon Feb 06 2023' }));
  // close DateInput
  await t.pressKey('esc');
  await t
    .expect(screen.getByRole('textbox').value)
    .eql('01/01/2023-02/06/2023');
});
