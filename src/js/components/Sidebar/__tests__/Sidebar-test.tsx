import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { hpe } from 'grommet-theme-hpe';

import { Avatar } from '../../Avatar';
import { Grommet } from '../../Grommet';
import { Sidebar } from '..';

const src = 'test.png';

describe('Sidebar', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Sidebar id="test id" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders outside grommet', () => {
    const { container } = render(<Sidebar id="test id" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('header', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Sidebar header={<Avatar src={src} />} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('footer', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Sidebar footer={<Avatar src={src} />} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('children', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Sidebar>
          <Avatar src={src} />
          children test
        </Sidebar>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('all', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Sidebar
          footer={<Avatar>SY</Avatar>}
          header={<Avatar src={src} />}
          background="brand"
        >
          test all props and children
        </Sidebar>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
