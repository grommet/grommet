import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Image } from '..';

const SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAA1JREFUCB1jYGBg+A8AAQQBAB5znEAAAAAASUVORK5CYII=';

test('Image renders', () => {
  const component = renderer.create(
    <Grommet>
      <Image src={SRC} />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Image fit renders', () => {
  const component = renderer.create(
    <Grommet>
      <Image fit="cover" src={SRC} />
      <Image fit="contain" src={SRC} />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Image opacity renders', () => {
  const component = renderer.create(
    <Grommet>
      <Image opacity="weak" src={SRC} />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
