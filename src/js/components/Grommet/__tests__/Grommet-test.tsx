import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { hpe as hpeTheme } from 'grommet-theme-hpe';

import { Grommet } from '..';
import { grommet } from '../../../themes/grommet';
// import { MessageContext } from '../../../contexts/MessageContext';
import {
  AnnounceContext,
  AnnounceValue,
} from '../../../contexts/AnnounceContext';

const TestAnnouncer = (props: { announce: AnnounceValue }) => {
  React.useEffect(() => props.announce('hello', 'assertive', 0));
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

  test('announce', (done) => {
    const { container } = render(
      <Grommet>
        <AnnounceContext.Consumer>
          {(announce) => <TestAnnouncer announce={announce} />}
        </AnnounceContext.Consumer>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    // no style, no need for expectPortal
    expect(
      document.body.querySelector('#grommet-announcer[aria-live]'),
    ).toMatchSnapshot();

    setTimeout(() => {
      // should clear the aria-live container
      expect(
        document.body.querySelector('#grommet-announcer[aria-live]'),
      ).toMatchSnapshot();
      done();
    }, 600); // wait the aria-live container to clear
  });

  // test('messages', () => {
  //   const { container } = render(
  //     <Grommet
  //       messages={{
  //         messages: {
  //           test: {
  //             label: 'My Label',
  //           },
  //         },
  //       }}
  //     >
  //       <MessageContext.Consumer>
  //         {({ format }) => format({ id: 'test.label' })}
  //       </MessageContext.Consumer>
  //     </Grommet>,
  //   );
  //   expect(container.firstChild).toMatchSnapshot();
  // });

  test('message format function', () => {
    const { container } = render(
      <Grommet full background="#0000ff">
        Grommet App
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
