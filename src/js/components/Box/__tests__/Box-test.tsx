import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Box, BoxProps } from '..';

describe('Box', () => {
  test('default', () => {
    const { container } = render(
      <Grommet>
        <Box />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

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

  test('alignSelf', () => {
    const { container } = render(
      <Grommet>
        <Box alignSelf="start" />
        <Box alignSelf="center" />
        <Box alignSelf="stretch" />
        <Box alignSelf="end" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  /* eslint-disable max-len */
  test('background', () => {
    const { container } = render(
      <Grommet>
        <Box background="brand" />
        <Box background="accent-1" />
        <Box background="neutral-1" />
        <Box background="light-1" />
        <Box background="dark-1" />
        <Box background="status-critical" />
        <Box background="#aabbcc" />
        <Box background="#def" />
        <Box background="rgb(90, 80, 50)" />
        <Box background="rgba(200, 100, 150, 0.8)" />
        <Box background="hsl(10, 50%, 20%)" />
        <Box background="hsla(10, 50%, 70%, 0.7)" />
        <Box background="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)" />
        <Box
          background={{
            image:
              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
            dark: false,
          }}
        />
        <Box
          background={{
            image:
              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
            dark: true,
          }}
        />
        <Box
          background={{
            image:
              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
            position: 'top center',
          }}
        />
        <Box
          background={{
            image:
              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
            opacity: 'strong',
          }}
        />
        <Box
          background={{
            image:
              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
            color: 'accent-1',
          }}
        />
        <Box
          background={{
            image:
              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
            size: 'contain',
          }}
        />
        <Box
          background={{
            image:
              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
            repeat: 'repeat',
          }}
        />
        <Box
          background={{
            image:
              'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
            opacity: 0.5,
          }}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  /* eslint-enable max-len */

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

  test('round', () => {
    const { container } = render(
      <Grommet>
        <Box round />
        <Box round="xsmall" />
        <Box round="small" />
        <Box round="medium" />
        <Box round="large" />
        <Box round="full" />
        <Box round={{ corner: 'left' }} />
        <Box round={{ corner: 'top' }} />
        <Box round={{ corner: 'right' }} />
        <Box round={{ corner: 'bottom' }} />
        <Box round={{ corner: 'top-left' }} />
        <Box round={{ corner: 'top-right' }} />
        <Box round={{ corner: 'bottom-left' }} />
        <Box round={{ corner: 'bottom-right' }} />
        <Box round={{ size: 'xsmall' }} />
        <Box round={{ size: 'small' }} />
        <Box round={{ size: 'medium' }} />
        <Box round={{ size: 'large' }} />
        <Box round={{ size: 'xlarge' }} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('border', () => {
    const { container } = render(
      <Grommet>
        <Box border="all" />
        <Box border="horizontal" />
        <Box border="vertical" />
        <Box border="top" />
        <Box border="left" />
        <Box border="bottom" />
        <Box border="right" />
        <Box border={{ color: 'accent-1' }} />
        <Box border={{ side: 'all' }} />
        <Box border={{ size: 'xsmall' }} />
        <Box border={{ size: 'small' }} />
        <Box border={{ size: 'medium' }} />
        <Box border={{ size: 'large' }} />
        <Box border={{ size: 'xlarge' }} />
        <Box border={{ style: 'dotted' }} />
        <Box border={{ style: 'double' }} />
        <Box border={{ style: 'dashed' }} />
        <Box
          border={[
            { side: 'top', color: 'accent-1', size: 'medium', style: 'dotted' },
            { side: 'left', color: 'accent-2', size: 'large', style: 'dashed' },
          ]}
        />
        <Box border="between" gap="small">
          <Box>one</Box>
          <Box>two</Box>
        </Box>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('elevation', () => {
    const { container } = render(
      <Grommet>
        <Box elevation="none" />
        <Box elevation="xsmall" />
        <Box elevation="small" />
        <Box elevation="medium" />
        <Box elevation="large" />
        <Box elevation="xlarge" />
        <Box background="dark-1" elevation="small">
          <Box elevation="small" />
        </Box>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('as string', () => {
    const { container } = render(
      <Grommet>
        <Box as="header" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('as function', () => {
    const { container } = render(
      <Grommet>
        <Box as={(props) => <header className={props.className} />} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('as component', () => {
    class Header extends React.Component<any> {
      render() {
        return <header className={this.props.className} />;
      }
    }
    const { container } = render(
      <Grommet>
        <Box as={Header} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('tag proxied', () => {
    const { container: tagComponent } = render(
      <Grommet>
        <Box tag="header" />
      </Grommet>,
    );
    const { container: asComponent } = render(
      <Grommet>
        <Box as="header" />
      </Grommet>,
    );

    expect(tagComponent).toEqual(asComponent);
  });

  test('animation', () => {
    const animationProps: BoxProps['animation'][] = [
      'fadeIn',
      'fadeOut',
      'jiggle',
      'pulse',
      'rotateLeft',
      'rotateRight',
      'slideUp',
      'slideDown',
      'slideLeft',
      'slideRight',
      'zoomIn',
      'zoomOut',
    ];
    const { container } = render(
      <Grommet>
        {animationProps.map((type) => (
          <Box key={String(type)} animation={type} />
        ))}
        <Box animation={['fadeIn', 'slideUp']} />
        <Box animation={{ type: 'fadeIn', duration: 1000, delay: 500 }} />
        <Box
          animation={[
            { type: 'fadeIn', duration: 1000, delay: 500 },
            { type: 'slideUp', duration: 1000, delay: 500 },
          ]}
        />
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

  test('onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <Grommet>
        <Box onClick={onClick}>test box</Box>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('test box'));

    expect(onClick).toBeCalled();
  });

  test('hoverIndicator', () => {
    const { container } = render(
      <Grommet>
        <Box>
          <Box onClick={() => {}} hoverIndicator />
          <Box onClick={() => {}} hoverIndicator="background-contrast" />\
          <Box
            onClick={() => {}}
            hoverIndicator={{ color: 'background-contrast' }}
          />
          <Box
            onClick={() => {}}
            hoverIndicator={{
              background: { color: 'background-contrast' },
              elevation: 'medium',
            }}
          />
        </Box>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders a11yTitle and aria-label', () => {
    const { container, getByLabelText } = render(
      <Grommet>
        <Box a11yTitle="test" />
        <Box aria-label="test-2" />
      </Grommet>,
    );
    expect(getByLabelText('test')).toBeTruthy();
    expect(getByLabelText('test-2')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
