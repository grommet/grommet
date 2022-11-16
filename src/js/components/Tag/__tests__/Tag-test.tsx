import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { Grommet, Tag } from '../..';

describe('Tag', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Tag a11yTitle="Test tag" value="Test" />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('passes through the aria-label prop', async () => {
    const TEST_LABEL = 'Test Label';
    const { container } = render(
      <Grommet>
        <Tag aria-label={TEST_LABEL} data-testid="tag" value="Test" />
      </Grommet>,
    );
    expect(screen.getByTestId('tag')).toHaveAttribute('aria-label', TEST_LABEL);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <Tag name="Name" value="Value" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('onClick', async () => {
    const user = userEvent.setup();

    const onClick = jest.fn();
    const { container } = render(
      <Grommet>
        <Tag value="Test" onClick={onClick} />
      </Grommet>,
    );

    await user.click(screen.getByRole('button'));
    expect(onClick).toBeCalled();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('onRemove', async () => {
    const user = userEvent.setup();

    const onRemove = jest.fn();
    const { container } = render(
      <Grommet>
        <Tag value="Test" onRemove={onRemove} />
      </Grommet>,
    );

    await user.click(screen.getByRole('button'));
    expect(onRemove).toBeCalled();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('size', () => {
    const { container } = render(
      <Grommet>
        <Tag size="xsmall" name="Name" value="Value" />
        <Tag size="small" name="Name" value="Value" />
        <Tag size="medium" name="Name" value="Value" />
        <Tag size="large" name="Name" value="Value" />
        <Tag size="xlarge" name="Name" value="Value" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
