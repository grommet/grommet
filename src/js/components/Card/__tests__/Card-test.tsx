import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Box } from '../../Box';
import { Card } from '..';
import { CardBody } from '../../CardBody';
import { CardFooter } from '../../CardFooter';
import { CardHeader } from '../../CardHeader';
import { Grommet } from '../../Grommet';
import { Text } from '../../Text';
import { ThemeType } from '../../..';

const customTheme: ThemeType = {
  global: {
    font: {
      family: `-apple-system,
           BlinkMacSystemFont,
           "Segoe UI"`,
    },
  },
  card: {
    container: {
      background: 'brand',
      elevation: 'large',
    },
    body: {
      pad: 'small',
      background: 'light-1',
    },
    header: {
      justify: 'start',
      pad: 'small',
    },
    footer: {
      pad: { horizontal: 'medium', vertical: 'small' },
      background: '#FFFFFF27',
    },
  },
};

describe('Card', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Card />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('header', () => {
    const { container } = render(
      <Grommet>
        <Card>
          <CardHeader>header</CardHeader>
        </Card>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('footer', () => {
    const { container } = render(
      <Grommet>
        <Card>
          <CardFooter>footer</CardFooter>
        </Card>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('children', () => {
    const { container } = render(
      <Grommet>
        <Card>
          <Box>
            <Text>test</Text>
          </Box>
        </Card>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('all', () => {
    const { container } = render(
      <Grommet>
        <Card>
          <CardHeader>header</CardHeader>
          <CardBody>body</CardBody>
          <CardFooter>footer</CardFooter>
        </Card>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('Themed', () => {
    const { container } = render(
      <Grommet theme={customTheme}>
        <Card width="small">
          <CardHeader>header</CardHeader>
          <CardBody>body</CardBody>
          <CardFooter>footer</CardFooter>
        </Card>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
