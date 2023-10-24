import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { Grommet } from '../../Grommet';
import { Form } from '../../Form';
import { Button } from '../../Button';
import { StarRating } from '..';
import { FormField } from '../../FormField';

describe('StarRating', () => {
  test('StarRating should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <StarRating name="test" />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  test('StarRating is present', () => {
    const { container, getByTestId } = render(
      <Grommet>
        <StarRating name="test" data-testid="starRating-icon" />
      </Grommet>,
    );

    expect(getByTestId('starRating-icon')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('value for rating', async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();
    const Test = () => (
      <Form onSubmit={({ value }) => onSubmit({ value })}>
        <FormField label="test-starRating">
          <StarRating name="test" />
        </FormField>
        <Button label="submit" type="submit" />
      </Form>
    );
    const { container, getByText } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    await user.tab();
    await user.keyboard('{arrowdown}');
    fireEvent.click(getByText('submit'));
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        value: { test: 2 },
      }),
    );
  });
});
