import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Box } from '..';

describe('Box', () => {
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
        <Box wrap />
        <Box wrap={false} />
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

  test('background', () => {
    const component = renderer.create(
      <Grommet>
        <Box background="brand" />
        <Box background="accent-1" />
        <Box background="neutral-1" />
        <Box background="light-1" />
        <Box background="dark-1" />
        <Box background="status-critical" />
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
            color: 'accent-1',
          }}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

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
        {['xsmall', 'small', 'medium', 'large'].map(gap => (
          <Box key={gap} gap={gap} direction="row">
            <Box />
          </Box>
        ))}
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
        <Box margin={{ top: 'small' }} />
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
        <Box pad={{ top: 'small' }} />
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

  test('tag', () => {
    const component = renderer.create(
      <Grommet>
        <Box tag="header" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('animation', () => {
    const component = renderer.create(
      <Grommet>
        {[
          'fadeIn',
          'fadeOut',
          'jiggle',
          'pulse',
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
});
