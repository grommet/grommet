import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import { Add, Next } from 'grommet-icons';

import { findAllByType } from '../../../utils';
import { Grommet, Button, Text } from '../..';

describe('Button', () => {
  afterEach(cleanup);

  test('basic', () => {
    const component = renderer.create(
      <Grommet>
        <Button label="Test" onClick={() => {}} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('children function', () => {
    const component = renderer.create(
      <Grommet>
        <Button onClick={() => {}}>{() => <Text>Test</Text>}</Button>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('warns about invalid label', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const component = renderer.create(
      <Grommet>
        <Button label="Test" onClick={() => {}}>
          invalid
        </Button>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith(
      'Button should not have children if icon or label is provided',
    );

    warnSpy.mockReset();
    warnSpy.mockRestore();
  });

  test('warns about invalid icon', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const component = renderer.create(
      <Grommet>
        <Button icon={<svg />} onClick={() => {}}>
          invalid
        </Button>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith(
      'Button should not have children if icon or label is provided',
    );

    warnSpy.mockReset();
    warnSpy.mockRestore();
  });

  test('primary', () => {
    const component = renderer.create(
      <Grommet>
        <Button primary label="Test" onClick={() => {}} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('color', () => {
    const component = renderer.create(
      <Grommet>
        <Button color="accent-1" label="Test" onClick={() => {}} />
        <Button color="accent-1" primary label="Test" onClick={() => {}} />
        <Button color="#111111" primary label="Test" onClick={() => {}} />
        <Button color="#123" primary label="Test" onClick={() => {}} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('fill', () => {
    const component = renderer.create(
      <Grommet>
        <Button>
          <Button fill />
          <Button fill={false} />
          <Button fill="horizontal" />
          <Button fill="vertical" />
        </Button>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('focus', () => {
    const { container, getByText } = render(
      <Grommet>
        <Button label="Test" onClick={() => {}} />
      </Grommet>,
    );

    fireEvent.focus(getByText('Test'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const component = renderer.create(
      <Grommet>
        <Button disabled />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('icon label', () => {
    const component = renderer.create(
      <Grommet>
        <Button icon={<svg />} label="Test" onClick={() => {}} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('reverse icon label', () => {
    const component = renderer.create(
      <Grommet>
        <Button reverse icon={<svg />} label="Test" onClick={() => {}} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('href', () => {
    const component = renderer.create(
      <Grommet>
        <Button href="test" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('hoverIndicator background', () => {
    const component = renderer.create(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator="background">
          hoverIndicator
        </Button>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('hoverIndicator as object with color', () => {
    const component = renderer.create(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator={{ color: 'brand' }}>
          hoverIndicator
        </Button>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('hoverIndicator as object with invalid color', () => {
    const component = renderer.create(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator={{ color: 'invalid' }}>
          hoverIndicator
        </Button>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('hoverIndicator color', () => {
    const component = renderer.create(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator="dark-3">
          hoverIndicator
        </Button>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('onClick', () => {
    const onClick = jest.fn();
    const component = renderer.create(
      <Grommet>
        <Button label="Test" onClick={onClick} />
      </Grommet>,
    );
    const tree = component.toJSON();

    const button = findAllByType(tree, 'button');
    button[0].props.onClick();
    expect(onClick).toBeCalled();
  });

  test('size', () => {
    const component = renderer.create(
      <Grommet>
        <Button size="small" label="Small" />
        <Button size="medium" label="Medium" />
        <Button label="Default" />
        <Button size="large" label="Large" />
        <Button primary size="small" label="Small" />
        <Button primary size="medium" label="Medium" />
        <Button primary label="Default" />
        <Button primary size="large" label="Large" />
        <Button size="small" icon={<Add />} primary />
        <Button size="medium" icon={<Add />} primary />
        <Button icon={<Add />} primary />
        <Button size="large" icon={<Add />} primary />
        <Button size="small" label="Small" icon={<Next />} reverse />
        <Button size="medium" label="Medium" icon={<Next />} reverse />
        <Button label="Default" icon={<Next />} reverse />
        <Button size="large" label="Large" icon={<Next />} reverse />
      </Grommet>,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('as', () => {
    const component = renderer.create(
      <Grommet>
        <Button as="span" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
