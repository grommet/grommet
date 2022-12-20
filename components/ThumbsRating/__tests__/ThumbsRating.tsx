import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { Button } from '../../Button';
import { Grommet } from '../../Grommet';
import { Form } from '../../Form';
import { FormField } from '../../FormField';
import { ThumbsRating } from '..';

describe('ThumbsRating', () => {
  test('StarRating should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <ThumbsRating name="test" />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  test('StarRating is present', () => {
    const { container, getByTestId } = render(
      <Grommet>
        <ThumbsRating name="test" data-testid="ThumbsRating-icon" />
      </Grommet>,
    );

    expect(getByTestId('ThumbsRating-icon')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('value for thumbs', async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();
    const Test = () => (
      <Form onSubmit={({ value }) => onSubmit({ value })}>
        <FormField label="test-starRating">
          <ThumbsRating name="test" />
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
        value: { test: 'dislike' },
      }),
    );
  });
});
