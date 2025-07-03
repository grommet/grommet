import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';

import { hpe as hpeTheme } from 'grommet-theme-hpe';

import { Grommet } from '..';
import { AnnounceContext } from '../../../contexts';
import { grommet } from '../../../themes/grommet';
import { MessageContext } from '../../../contexts/MessageContext';

const TestAnnouncer = ({ announce }) => {
  React.useEffect(() => announce('hello', 'assertive'));
  return <div>hi</div>;
};

describe('Grommet', () => {
  test('basic', () => {
    const { container } = render(<Grommet />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('grommet theme', () => {
    const { container } = render(<Grommet theme={grommet} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('hpe theme', () => {
    const { container } = render(
      <Grommet theme={hpeTheme}>Grommet App</Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('themeMode', () => {
    const { container } = render(<Grommet theme={grommet} themeMode="dark" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('cssVars', () => {
    const { container } = render(<Grommet cssVars>Grommet App</Grommet>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('full', () => {
    const { container } = render(<Grommet full>Grommet App</Grommet>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('full min', () => {
    const { container } = render(<Grommet full="min">Grommet App</Grommet>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('background', () => {
    const { container } = render(
      <Grommet full background="#0000ff">
        Grommet App
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('announce', () => {
    jest.useFakeTimers();

    const { container } = render(
      <Grommet>
        <AnnounceContext.Consumer>
          {(announce) => <TestAnnouncer announce={announce} />}
        </AnnounceContext.Consumer>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();

    // Check that announcer element is created
    const announcer = document.body.querySelector(
      '#grommet-announcer[aria-live]',
    );
    expect(announcer).toBeInTheDocument();
    expect(announcer).toMatchSnapshot();

    jest.advanceTimersByTime(100);

    // The message should now be announced
    expect(announcer.textContent).toBe('hello');
    expect(announcer.getAttribute('aria-live')).toBe('assertive');

    // Fast-forward past the timeout
    jest.advanceTimersByTime(500);

    // The announcer should be cleared
    expect(announcer.textContent).toBe('');

    jest.useRealTimers();
  });

  test('messages', () => {
    const { container } = render(
      <Grommet
        messages={{
          messages: {
            test: {
              label: 'My Label',
            },
          },
        }}
      >
        <MessageContext.Consumer>
          {({ format }) => format({ id: 'test.label' })}
        </MessageContext.Consumer>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('message format function', () => {
    const messages = {
      'test.label': 'My Label',
    };
    const { container } = render(
      <Grommet full background="#0000ff">
        Grommet App
      </Grommet>,

      <Grommet messages={{ format: (opts) => messages[opts.id] }}>
        <MessageContext.Consumer>
          {({ format }) => format({ id: 'test.label' })}
        </MessageContext.Consumer>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
