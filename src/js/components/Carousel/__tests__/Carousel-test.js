import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Grommet } from '../../Grommet';
import { Carousel } from '../';
import { Image } from '../../Image';

Enzyme.configure({ adapter: new Adapter() });

test('renders', () => {
  const component = renderer.create(
    <Grommet>
      <Carousel>
        <Image src='//v2.grommet.io/assets/IMG_4245.jpg' />
        <Image src='//v2.grommet.io/assets/IMG_4210.jpg' />
      </Carousel>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('play renders', (done) => {
  const component = mount(
    <Grommet>
      <Carousel play={1000}>
        <Image src='//v2.grommet.io/assets/IMG_4245.jpg' />
        <Image src='//v2.grommet.io/assets/IMG_4210.jpg' />
      </Carousel>
    </Grommet>
  );
  expect(component.getDOMNode()).toMatchSnapshot();

  // give some time for the carousel to advance
  setTimeout(() => {
    expect(component.getDOMNode()).toMatchSnapshot();
    component.unmount();
    done();
  }, 1300);
});
