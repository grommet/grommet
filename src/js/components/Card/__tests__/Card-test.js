import React from 'react';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Avatar } from '../../Avatar';
import { Grommet } from '../../Grommet';
import { Card } from '..';

const src = '';

describe('Card', () => {
  afterEach(cleanup);

  test('renders', () => {
    const component = renderer.create(
      <Grommet>
        <Card id="test id" name="test name" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('header', () => {
    const component = renderer.create(
      <Grommet>
        <Card header={<Avatar src={src} />} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('footer', () => {
    const component = renderer.create(
      <Grommet>
        <Card footer={<Avatar src={src} />} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('children', () => {
    const component = renderer.create(
      <Grommet>
        <Card>
          <Avatar src={src} />
          children test
        </Card>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('all', () => {
    const component = renderer.create(
      <Grommet>
        <Card background="dark-1" header="header" footer="footer">
          content
        </Card>
        <Card header="header" footer="footer">
          content
        </Card>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
