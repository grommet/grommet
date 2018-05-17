import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, renderIntoDocument, Simulate } from 'react-testing-library';

import { Grommet } from '../../Grommet';
import { Carousel } from '../';
import { Image } from '../../Image';

describe('Carousel', () => {
  afterEach(cleanup);

  test('basic', () => {
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

  test('navigate', () => {
    const { getByTestId, container } = renderIntoDocument(
      <Grommet>
        <Carousel data-testid='test-carousel'>
          <Image src='//v2.grommet.io/assets/IMG_4245.jpg' />
          <Image src='//v2.grommet.io/assets/IMG_4210.jpg' />
        </Carousel>
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.keyDown(getByTestId('test-carousel'), { key: 'Right', keyCode: 39, which: 39 });
    expect(container.firstChild).toMatchSnapshot();

    Simulate.keyDown(getByTestId('test-carousel'), { key: 'Left', keyCode: 37, which: 37 });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('play', (done) => {
    const { container } = renderIntoDocument(
      <Grommet>
        <Carousel play={1000}>
          <Image src='//v2.grommet.io/assets/IMG_4245.jpg' />
          <Image src='//v2.grommet.io/assets/IMG_4210.jpg' />
        </Carousel>
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    // give some time for the carousel to advance
    setTimeout(() => {
      expect(container.firstChild).toMatchSnapshot();
      done();
    }, 1300);
  });
});
