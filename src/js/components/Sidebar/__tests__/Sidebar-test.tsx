import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Avatar } from '../../Avatar';
import { Grommet } from '../../Grommet';
import { Sidebar } from '..';

const src = 'test.png';

describe('Sidebar', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
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
      <Grommet>
        <Sidebar header={<Avatar src={src} />} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('footer', () => {
    const { container } = render(
      <Grommet>
        <Sidebar footer={<Avatar src={src} />} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('children', () => {
    const { container } = render(
      <Grommet>
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
      <Grommet>
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

  test('theme gap and pad', () => {
    const customTheme = {
      sidebar: {
        gap: 'small',
        pad: 'small',
      },
    };

    const { container } = render(
      <Grommet theme={customTheme}>
        <Sidebar header={<Avatar src={src} />} footer={<Avatar>SY</Avatar>}>
          <div>Sidebar content 1</div>
          <div>Sidebar content 2</div>
          <div>Sidebar content 3</div>
        </Sidebar>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
