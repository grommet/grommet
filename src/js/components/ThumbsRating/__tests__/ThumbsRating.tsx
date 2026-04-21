import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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
import { Add, AddCircle, Subtract, SubtractCircle } from 'grommet-icons';

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

  test('StarRating renders outside grommet wrapper', () => {
    const { container } = render(<ThumbsRating name="test" />);

    expect(container.firstChild).toMatchSnapshot();
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
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        value: { test: 'dislike' },
      }),
    );
  });

  test('should use icons from theme', async () => {
    const user = userEvent.setup();
    render(
      <Grommet
        theme={{
          thumbsRating: {
            icons: {
              like: Add,
              likeSelected: AddCircle,
              dislike: Subtract,
              dislikeSelected: SubtractCircle,
            },
          },
        }}
      >
        <ThumbsRating name="test" data-testid="ThumbsRating-icon" />
      </Grommet>,
    );

    expect(screen.getByLabelText('Add')).toBeInTheDocument();
    expect(screen.getByLabelText('Subtract')).toBeInTheDocument();

    await user.tab();
    await user.keyboard('{arrowdown}');
    expect(screen.getByLabelText('SubtractCircle')).toBeInTheDocument();
    await user.keyboard('{arrowdown}');
    expect(screen.getByLabelText('AddCircle')).toBeInTheDocument();
  });
});
