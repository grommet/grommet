import React from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Grommet, Notification } from '../..';

describe('Notification', () => {
  test('should have no accessibility violations', async () => {
    const { container, asFragment } = render(
      <Grommet>
        <Notification title="title" />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(asFragment()).toMatchSnapshot();
  });

  test('should have no accessibility violations for toast', async () => {
    const { container, asFragment } = render(
      <Grommet>
        <Notification toast title="title" message="message" />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(asFragment()).toMatchSnapshot();
  });

  test('onClose', () => {
    const onClose = jest.fn();
    render(
      <Grommet>
        <Notification title="Title" onClose={onClose} />
      </Grommet>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(onClose).toBeCalled();
  });

  test('autoClose', async () => {
    jest.useFakeTimers('modern');
    const { getAllByText } = render(
      <Grommet>
        <Notification
          toast={{ autoClose: false }}
          title="title"
          message="message"
        />
      </Grommet>,
    );
    jest.runAllTimers();
    expect(getAllByText('title')[0]).toBeInTheDocument();
  });
});
