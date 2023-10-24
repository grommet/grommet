import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Box, BoxProps } from '..';

describe('Box', () => {
  test('direction', () => {
    const { container } = render(
      <Grommet>
        <Box direction="row" />
        <Box direction="row-responsive" />
        <Box direction="column" />
        <Box direction="column-reverse" />
        <Box direction="row-reverse" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('responsive', () => {
    const { container } = render(
      <Grommet>
        <Box responsive />
        <Box responsive={false} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('wrap', () => {
    const wrapProps: BoxProps['wrap'][] = [true, false, 'reverse'];
    const { container } = render(
      <Grommet>
        {wrapProps.map((wrap) => (
          <Box key={`${wrap}`} wrap={wrap} />
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('justify', () => {
    const { container } = render(
      <Grommet>
        <Box justify="start" />
        <Box justify="center" />
        <Box justify="between" />
        <Box justify="around" />
        <Box justify="evenly" />
        <Box justify="end" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('align', () => {
    const { container } = render(
      <Grommet>
        {/* Mapped values */}
        <Box align="start" />
        <Box align="center" />
        <Box align="baseline" />
        <Box align="stretch" />
        <Box align="end" />
        {/* Any valid CSS align-items strings */}
        <Box align="normal" />
        <Box align="first baseline" />
        <Box align="last baseline" />
        <Box align="safe center" />
        <Box align="unsafe center" />
        <Box align="inherit" />
        <Box align="initial" />
        <Box align="unset" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('alignContent', () => {
    const { container } = render(
      <Grommet>
        {/* Mapped values */}
        <Box alignContent="start" />
        <Box alignContent="center" />
        <Box alignContent="between" />
        <Box alignContent="around" />
        <Box alignContent="stretch" />
        <Box alignContent="end" />
        <Box alignContent="baseline" />
        <Box alignContent="evenly" />
        {/* Any valid CSS align-content strings */}
        <Box alignContent="normal" />
        <Box alignContent="first baseline" />
        <Box alignContent="last baseline" />
        <Box alignContent="space-between" />
        <Box alignContent="space-around" />
        <Box alignContent="space-evenly" />
        <Box alignContent="safe center" />
        <Box alignContent="unsafe center" />
        <Box alignContent="inherit" />
        <Box alignContent="initial" />
        <Box alignContent="unset" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  // the test is being skipped until we change styled box to use attrs
  test('alignSelf', () => {
    const { container } = render(
      <Grommet>
        <Box alignSelf="start" />
        <Box alignSelf="center" />
        <Box alignSelf="stretch" />
        <Box alignSelf="end" />
        <Box alignSelf="baseline" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('basis', () => {
    const { container } = render(
      <Grommet>
        <Box>
          <Box basis="xsmall" />
          <Box basis="small" />
          <Box basis="medium" />
          <Box basis="large" />
          <Box basis="xlarge" />
        </Box>
        <Box direction="row">
          <Box basis="full" />
        </Box>
        <Box direction="row">
          <Box basis="1/2" />
          <Box basis="2/4" />
        </Box>
        <Box direction="row">
          <Box basis="1/3" />
          <Box basis="2/3" />
        </Box>
        <Box direction="row">
          <Box basis="1/4" />
          <Box basis="3/4" />
        </Box>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('flex', () => {
    const { container } = render(
      <Grommet>
        <Box>
          <Box flex />
          <Box flex={false} />
          <Box flex="grow" />
          <Box flex="shrink" />
          <Box flex={{ grow: 2 }} />
          <Box flex={{ shrink: 2 }} />
          <Box flex={{ grow: 2, shrink: 2 }} />
        </Box>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('fill', () => {
    const { container } = render(
      <Grommet>
        <Box>
          <Box fill />
          <Box fill={false} />
          <Box fill="horizontal" />
          <Box fill="vertical" />
        </Box>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('gap', () => {
    const { container } = render(
      <Grommet>
        {['xsmall', 'small', 'medium', 'large', '80px', 'none'].map((gap) => (
          <Box key={gap} gap={gap} direction="row">
            <Box />
          </Box>
        ))}
        <Box as="span" gap="small">
          <span>first</span>
          <span>second</span>
        </Box>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('css gap', () => {
    const { container } = render(
      <Grommet options={{ box: { cssGap: true } }}>
        {['xsmall', 'small', 'medium', 'large', '80px', 'none'].map((gap) => (
          <Box key={gap} gap={gap} direction="row">
            <Box />
            <Box />
          </Box>
        ))}
        <Box as="span" gap="small">
          <span>first</span>
          <span>second</span>
        </Box>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('margin', () => {
    const { container } = render(
      <Grommet>
        <Box margin="small" />
        <Box margin="medium" />
        <Box margin="large" />
        <Box margin={{ horizontal: 'small' }} />
        <Box margin={{ vertical: 'small' }} />
        <Box margin={{ bottom: 'small' }} />
        <Box margin={{ left: 'small' }} />
        <Box margin={{ right: 'small' }} />
        <Box margin={{ start: 'small' }} />
        <Box margin={{ end: 'small' }} />
        <Box margin={{ top: 'small' }} />
        <Box margin={{ top: 'small', left: 'medium', horizontal: 'large' }} />
        <Box margin={{ top: 'small', vertical: 'large' }} />
        <Box
          margin={{
            horizontal: 'large',
            vertical: 'large',
            left: 'small',
          }}
        />
        <Box
          margin={{
            top: 'small',
            right: 'small',
            left: 'small',
            bottom: 'small',
          }}
        />
        <Box
          margin={{
            left: 'small',
            right: 'medium',
            bottom: 'large',
            top: 'small',
            horizontal: 'medium',
            vertical: 'small',
          }}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad', () => {
    const { container } = render(
      <Grommet>
        <Box pad="small" />
        <Box pad="medium" />
        <Box pad="large" />
        <Box pad={{ horizontal: 'small' }} />
        <Box pad={{ vertical: 'small' }} />
        <Box pad={{ bottom: 'small' }} />
        <Box pad={{ left: 'small' }} />
        <Box pad={{ right: 'small' }} />
        <Box pad={{ start: 'small' }} />
        <Box pad={{ end: 'small' }} />
        <Box pad={{ top: 'small' }} />
        <Box pad={{ top: 'small', left: 'medium', horizontal: 'large' }} />
        <Box pad={{ horizontal: 'large', vertical: 'large' }} />
        <Box
          pad={{
            top: 'small',
            right: 'medium',
            horizontal: 'small',
            vertical: 'large',
          }}
        />
        <Box
          pad={{
            top: 'medium',
            right: 'medium',
            left: 'medium',
            bottom: 'medium',
            horizontal: 'small',
          }}
        />
        <Box
          pad={{
            left: 'small',
            right: 'medium',
            bottom: 'large',
            top: 'small',
            horizontal: 'medium',
            vertical: 'small',
          }}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('gridArea', () => {
    const { container } = render(
      <Grommet>
        <Box gridArea="header" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('width', () => {
    const { container } = render(
      <Grommet>
        <Box width="xsmall" />
        <Box width="small" />
        <Box width="medium" />
        <Box width="large" />
        <Box width="xlarge" />
        <Box width="111px" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('width object', () => {
    const { container } = render(
      <Grommet>
        <Box width={{ width: '100px' }} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('height', () => {
    const { container } = render(
      <Grommet>
        <Box height="xsmall" />
        <Box height="small" />
        <Box height="medium" />
        <Box height="large" />
        <Box height="xlarge" />
        <Box height="111px" />
        <Box height={{ min: 'small', max: '100%', height: 'large' }} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders border=between and gap=pixel value', () => {
    const { container } = render(
      <Grommet>
        <Box gap="12px" border="between" pad="medium">
          <Box pad="small" background="dark-3">
            Test 1
          </Box>
          <Box pad="medium" background="light-3">
            Test 2
          </Box>
        </Box>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
