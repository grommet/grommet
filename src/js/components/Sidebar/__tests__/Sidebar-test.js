import React from 'react';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Avatar } from '../../Avatar';
import { MnetUIBase } from '../../MnetUIBase';
import { Sidebar } from '..';

const src = '';

describe('Sidebar', () => {
  afterEach(cleanup);

  test('renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Sidebar id="test id" name="test name" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('header', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Sidebar header={<Avatar src={src} />} />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('footer', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Sidebar footer={<Avatar src={src} />} />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('children', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Sidebar>
          <Avatar src={src} />
          children test
        </Sidebar>
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('all', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Sidebar
          footer={<Avatar>SY</Avatar>}
          header={<Avatar src={src} />}
          background="brand"
        >
          test all props and children
        </Sidebar>
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
