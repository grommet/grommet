import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Grommet } from '../../Grommet';
import { Stack } from '../../Stack';
import { Box } from '../../Box';
import { Diagram } from '../';

Enzyme.configure({ adapter: new Adapter() });

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

test('Diagram renders', (done) => {
  const component = mount(
    <Context>
      <Diagram
        connections={[{ fromId: '1', toId: '2' }]}
      />
    </Context>
  );
  // delay a bit so we can render twice
  setTimeout(() => {
    expect(component.getDOMNode()).toMatchSnapshot();
    component.unmount();
    done();
  }, 10);
});

test('Diagram type renders', () => {
  const component = mount(
    <Context>
      <Diagram
        connections={[
          { fromId: '1', toId: '2', type: 'direct' },
          { fromId: '1', toId: '2', type: 'curved' },
          { fromId: '1', toId: '2', type: 'rectilinear' },
        ]}
      />
    </Context>
  );
  expect(component.getDOMNode()).toMatchSnapshot();
});

test('Diagram color renders', () => {
  const component = mount(
    <Context>
      <Diagram
        connections={[
          { fromId: '1', toId: '2', color: 'brand' },
        ]}
      />
    </Context>
  );
  expect(component.getDOMNode()).toMatchSnapshot();
});

test('Diagram offset renders', (done) => {
  const component = mount(
    <Context>
      <Diagram
        connections={[
          { fromId: '1', toId: '2', offset: 'xsmall' },
          { fromId: '1', toId: '2', offset: 'small' },
          { fromId: '1', toId: '2', offset: 'medium' },
        ]}
      />
    </Context>
  );
  // delay a bit so we can render twice
  setTimeout(() => {
    expect(component.getDOMNode()).toMatchSnapshot();
    component.unmount();
    done();
  }, 10);
});

test('Diagram thickness renders', () => {
  const component = mount(
    <Context>
      <Diagram
        connections={[
          { fromId: '1', toId: '2', thickness: 'xsmall' },
          { fromId: '1', toId: '2', thickness: 'small' },
          { fromId: '1', toId: '2', thickness: 'medium' },
        ]}
      />
    </Context>
  );
  expect(component.getDOMNode()).toMatchSnapshot();
});
