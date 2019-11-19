import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { TextArea } from '..';

jest.mock('react-dom');

describe('TextArea', () => {
  test('basic', () => {
    const component = renderer.create(
      <Grommet>
        <TextArea id="item" name="item" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('placeholder', () => {
    const component = renderer.create(
      <Grommet>
        <TextArea id="item" name="item" placeholder="placeholder" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('plain', () => {
    const component = renderer.create(
      <Grommet>
        <TextArea id="item" name="item" plain />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('disabled', () => {
    const component = renderer.create(
      <Grommet>
        <TextArea disabled id="item" name="item" plain />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('focusIndicator', () => {
    const component = renderer.create(
      <Grommet>
        <TextArea id="item" name="item" focusIndicator />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('fill', () => {
    const component = renderer.create(
      <Grommet>
        <TextArea id="item" name="item" fill />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  [true, false, 'horizontal', 'vertical'].forEach(resize => {
    test(`resize ${resize}`, () => {
      const component = renderer.create(
        <Grommet>
          <TextArea id="item" name="item" resize={resize} />
        </Grommet>,
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  ['small', 'medium', 'large'].forEach(size => {
    test(`size ${size}`, () => {
      const component = renderer.create(
        <Grommet>
          <TextArea id="item" name="item" size={size} />
        </Grommet>,
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
