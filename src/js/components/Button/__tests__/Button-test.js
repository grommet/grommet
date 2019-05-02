import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { findAllByType } from '../../../utils';
import { Grommet, Button, Text } from '../..';

describe('Button', () => {
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
    const component = renderer.create(
      <Grommet>
        <Button focus label="Test" onClick={() => {}} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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

  test('hoverIndicator as object', () => {
    const component = renderer.create(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator={{ background: true }}>
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
        <Button onClick={() => {}} hoverIndicator={{ background: 'brand' }}>
          hoverIndicator
        </Button>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('hoverIndicator as object with colorIndex', () => {
    const component = renderer.create(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator={{ background: 'accent-1' }}>
          hoverIndicator
        </Button>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('hoverIndicator as object with invalid color', () => {
    let component = renderer.create(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator={{ background: 'accent' }}>
          hoverIndicator
        </Button>
      </Grommet>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component = renderer.create(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator={{ background: 'invalid' }}>
          hoverIndicator
        </Button>
      </Grommet>,
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('hoverIndicator as object with invalid colorIndex', () => {
    const component = renderer.create(
      <Grommet>
        <Button
          onClick={() => {}}
          hoverIndicator={{ background: 'accent-100' }}
        >
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
