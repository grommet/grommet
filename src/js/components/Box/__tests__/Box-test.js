import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Box } from '..';

describe('Box', () => {
  afterEach(cleanup);

  test('default', () => {
    const component = renderer.create(
      <Grommet>
        <Box />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('direction', () => {
    const component = renderer.create(
      <Grommet>
        <Box direction="row" />
        <Box direction="row-responsive" />
        <Box direction="column" />
        <Box direction="column-reverse" />
        <Box direction="row-reverse" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('responsive', () => {
    const component = renderer.create(
      <Grommet>
        <Box responsive />
        <Box responsive={false} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('wrap', () => {
    const component = renderer.create(
      <Grommet>
        {[true, false, 'reverse'].map(wrap => (
          <Box key={`${wrap}`} wrap={wrap} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('justify', () => {
    const component = renderer.create(
      <Grommet>
        <Box justify="start" />
        <Box justify="center" />
        <Box justify="between" />
        <Box justify="around" />
        <Box justify="evenly" />
        <Box justify="end" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('align', () => {
    const component = renderer.create(
      <Grommet>
        <Box align="start" />
        <Box align="center" />
        <Box align="baseline" />
        <Box align="stretch" />
        <Box align="end" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('alignContent', () => {
    const component = renderer.create(
      <Grommet>
        <Box alignContent="start" />
        <Box alignContent="center" />
        <Box alignContent="between" />
        <Box alignContent="around" />
        <Box alignContent="stretch" />
        <Box alignContent="end" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('alignSelf', () => {
    const component = renderer.create(
      <Grommet>
        <Box alignSelf="start" />
        <Box alignSelf="center" />
        <Box alignSelf="stretch" />
        <Box alignSelf="end" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  /* eslint-disable max-len */
  test('background', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  /* eslint-enable max-len */

  test('basis', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('flex', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('fill', () => {
    const component = renderer.create(
      <Grommet>
        <Box>
          <Box fill />
          <Box fill={false} />
          <Box fill="horizontal" />
          <Box fill="vertical" />
        </Box>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('gap', () => {
    const component = renderer.create(
      <Grommet>
        {['xsmall', 'small', 'medium', 'large', '80px', 'none'].map(gap => (
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('margin', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('pad', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('gridArea', () => {
    const component = renderer.create(
      <Grommet>
        <Box gridArea="header" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('round', () => {
    const component = renderer.create(
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
        <Box
          round={{
            corners: [
              { corner: 'top-left', size: 'small' },
              { corner: 'top-right', size: 'large' },
              { corner: 'bottom-left', size: 'medium' },
              { corner: 'bottom-right', size: 'xsmall' },
            ],
          }}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('border', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('elevation', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('as', () => {
    const component = renderer.create(
      <Grommet>
        <Box as="header" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('tag proxied', () => {
    const tagComponent = renderer.create(
      <Grommet>
        <Box tag="header" />
      </Grommet>,
    );
    const asComponent = renderer.create(
      <Grommet>
        <Box as="header" />
      </Grommet>,
    );
    expect(tagComponent.toJSON()).toEqual(asComponent.toJSON());
  });

  test('animation', () => {
    const component = renderer.create(
      <Grommet>
        {[
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
        ].map(type => (
          <Box key={type} animation={type} />
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('width', () => {
    const component = renderer.create(
      <Grommet>
        <Box width="xsmall" />
        <Box width="small" />
        <Box width="medium" />
        <Box width="large" />
        <Box width="xlarge" />
        <Box width="111px" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('width object', () => {
    const component = renderer.create(
      <Grommet>
        <Box width={{ width: '100px' }} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('height', () => {
    const component = renderer.create(
      <Grommet>
        <Box height="xsmall" />
        <Box height="small" />
        <Box height="medium" />
        <Box height="large" />
        <Box height="xlarge" />
        <Box height="111px" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
