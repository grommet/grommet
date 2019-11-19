import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { Grommet } from '../../Grommet';
import { Carousel } from '..';
import { Image } from '../../Image';

describe('Carousel', () => {
  afterEach(cleanup);

  test('basic', () => {
    const component = renderer.create(
      <Grommet>
        <Carousel>
          <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
          <Image src="//v2.grommet.io/assets/IMG_4210.jpg" />
        </Carousel>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('basic with `initialChild: 1`', () => {
    const component = renderer.create(
      <Grommet>
        <Carousel initialChild={1}>
          <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
          <Image src="//v2.grommet.io/assets/IMG_4210.jpg" />
        </Carousel>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('navigate', () => {
    const { getByTestId, container } = render(
      <Grommet>
        <Carousel data-testid="test-carousel">
          <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
          <Image src="//v2.grommet.io/assets/IMG_4210.jpg" />
        </Carousel>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.keyDown(getByTestId('test-carousel'), {
      key: 'Right',
      keyCode: 39,
      which: 39,
    });
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.keyDown(getByTestId('test-carousel'), {
      key: 'Left',
      keyCode: 37,
      which: 37,
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('play', done => {
    const { container } = render(
      <Grommet>
        <Carousel play={1000}>
          <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
          <Image src="//v2.grommet.io/assets/IMG_4210.jpg" />
        </Carousel>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    // give some time for the carousel to advance
    setTimeout(() => {
      expect(container.firstChild).toMatchSnapshot();
      done();
    }, 1300);
  });
});
