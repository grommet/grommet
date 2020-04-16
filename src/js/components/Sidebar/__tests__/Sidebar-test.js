import React from 'react';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Avatar } from '../../Avatar';
import { Grommet } from '../../Grommet';
import { Sidebar } from '..';

const src = '';

describe('Sidebar', () => {
  afterEach(cleanup);

  test('renders', () => {
    const component = renderer.create(
      <Grommet>
        <Sidebar id="test id" name="test name" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('header', () => {
    const component = renderer.create(
      <Grommet>
        <Sidebar header={<Avatar src={src} />} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('footer', () => {
    const component = renderer.create(
      <Grommet>
        <Sidebar footer={<Avatar src={src} />} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('children', () => {
    const component = renderer.create(
      <Grommet>
        <Sidebar>
          <Avatar src={src} />
          children test
        </Sidebar>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('all', () => {
    const component = renderer.create(
      <Grommet>
        <Sidebar
          footer={<Avatar>SY</Avatar>}
          header={<Avatar src={src} />}
          background="brand"
        >
          test all props and children
        </Sidebar>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
