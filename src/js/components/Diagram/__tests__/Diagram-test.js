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

describe('Diagram', () => {
  test('renders', (done) => {
    const component = mount(
      <Context>
        <Diagram
          connections={[{ fromTarget: '1', toTarget: '2' }]}
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

  test('type renders', () => {
    const component = mount(
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
    expect(component.getDOMNode()).toMatchSnapshot();
  });

  test('color renders', () => {
    const component = mount(
      <Context>
        <Diagram
          connections={[
            { fromTarget: '1', toTarget: '2', color: 'brand' },
          ]}
        />
      </Context>
    );
    expect(component.getDOMNode()).toMatchSnapshot();
  });

  test('offset renders', (done) => {
    const component = mount(
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
    // delay a bit so we can render twice
    setTimeout(() => {
      expect(component.getDOMNode()).toMatchSnapshot();
      component.unmount();
      done();
    }, 10);
  });

  test('thickness renders', () => {
    const component = mount(
      <Context>
        <Diagram
          connections={[
            { fromTarget: '1', toTarget: '2', thickness: 'xsmall' },
            { fromTarget: '1', toTarget: '2', thickness: 'small' },
            { fromTarget: '1', toTarget: '2', thickness: 'medium' },
          ]}
        />
      </Context>
    );
    expect(component.getDOMNode()).toMatchSnapshot();
  });
});
