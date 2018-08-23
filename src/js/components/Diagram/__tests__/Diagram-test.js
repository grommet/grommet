import React from 'react';
import 'jest-styled-components';
import { cleanup, renderIntoDocument } from 'react-testing-library';

import { Grommet, Box, Diagram, Stack } from '../../';

const Context = ({ children }) => (
  <Grommet>
    <Stack>
      <Box direction='row'>
        <Box id='1' pad='medium' />
        <Box id='2' pad='medium' />
      </Box>
      {children}
    </Stack>
  </Grommet>
);

describe('Diagram', () => {
  afterEach(cleanup);

  test('basic', () => {
    const { container } = renderIntoDocument(
      <Context>
        <Diagram
          connections={[{ fromTarget: '1', toTarget: '2' }]}
        />
      </Context>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('type', () => {
    const { container } = renderIntoDocument(
      <Context>
        <Diagram
          connections={[
            { fromTarget: '1', toTarget: '2', type: 'direct' },
            { fromTarget: '1', toTarget: '2', type: 'curved' },
            { fromTarget: '1', toTarget: '2', type: 'rectilinear' },
          ]}
        />
      </Context>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('color', () => {
    const { container } = renderIntoDocument(
      <Context>
        <Diagram
          connections={[
            { fromTarget: '1', toTarget: '2', color: 'brand' },
          ]}
        />
      </Context>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('offset', () => {
    const { container } = renderIntoDocument(
      <Context>
        <Diagram
          connections={[
            { fromTarget: '1', toTarget: '2', offset: 'xsmall' },
            { fromTarget: '1', toTarget: '2', offset: 'small' },
            { fromTarget: '1', toTarget: '2', offset: 'medium' },
          ]}
        />
      </Context>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('thickness', () => {
    const { container } = renderIntoDocument(
      <Context>
        <Diagram
          connections={[
            { fromTarget: '1', toTarget: '2', thickness: 'hair' },
            { fromTarget: '1', toTarget: '2', thickness: 'xxsmall' },
            { fromTarget: '1', toTarget: '2', thickness: 'xsmall' },
            { fromTarget: '1', toTarget: '2', thickness: 'small' },
            { fromTarget: '1', toTarget: '2', thickness: 'medium' },
            { fromTarget: '1', toTarget: '2', thickness: '5px' },
          ]}
        />
      </Context>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('anchor', () => {
    const { container } = renderIntoDocument(
      <Context>
        <Diagram
          connections={[
            { fromTarget: '1', toTarget: '2', anchor: 'center' },
            { fromTarget: '1', toTarget: '2', anchor: 'horizontal' },
            { fromTarget: '1', toTarget: '2', anchor: 'vertical' },
          ]}
        />
      </Context>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
