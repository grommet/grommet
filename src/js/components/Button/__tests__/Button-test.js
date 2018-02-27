import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { findAllByType } from '../../../utils';

import { Grommet } from '../../Grommet';
import { Button } from '../';

test('Button renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button warns about invalid label render', () => {
  const warnSpy = jest.spyOn(console, 'warn');
  const component = renderer.create(
    <Grommet>
      <Button label='Test' onClick={() => {}}>invalid</Button>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(warnSpy).toHaveBeenCalledWith('Button should not have children if icon or label is provided');

  warnSpy.mockReset();
  warnSpy.mockRestore();
});

test('Button warns about invalid icon render', () => {
  const warnSpy = jest.spyOn(console, 'warn');
  const component = renderer.create(
    <Grommet>
      <Button icon={<svg />} onClick={() => {}}>invalid</Button>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(warnSpy).toHaveBeenCalledWith('Button should not have children if icon or label is provided');

  warnSpy.mockReset();
  warnSpy.mockRestore();
});

test('Button primary renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button primary={true} label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button color renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button color='accent-1' label='Test' onClick={() => {}} />
      <Button color='accent-1' primary={true} label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button focus renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button focus={true} label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button disabled renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button icon label renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button icon={<svg />} label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button reverse icon label renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button
        reverse={true}
        icon={<svg />}
        label='Test'
        onClick={() => {}}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button href renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button href='test' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button hoverIndicator renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button onClick={() => {}} hoverIndicator='background'>
        hoverIndicator
      </Button>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button hoverIndicator as object renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button onClick={() => {}} hoverIndicator={{ background: true }}>
        hoverIndicator
      </Button>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button hoverIndicator as object with color renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button onClick={() => {}} hoverIndicator={{ background: 'brand' }}>
        hoverIndicator
      </Button>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button hoverIndicator as object with colorIndex renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button onClick={() => {}} hoverIndicator={{ background: 'accent-1' }}>
        hoverIndicator
      </Button>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button hoverIndicator as object with invalid color renders', () => {
  let component = renderer.create(
    <Grommet>
      <Button onClick={() => {}} hoverIndicator={{ background: 'accent' }}>
        hoverIndicator
      </Button>
    </Grommet>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  component = renderer.create(
    <Grommet>
      <Button onClick={() => {}} hoverIndicator={{ background: 'invalid' }}>
        hoverIndicator
      </Button>
    </Grommet>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button hoverIndicator as object with invalid colorIndex renders', () => {
  const component = renderer.create(
    <Grommet>
      <Button onClick={() => {}} hoverIndicator={{ background: 'accent-100' }}>
        hoverIndicator
      </Button>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button is clickable', () => {
  const onClick = jest.fn();
  const component = renderer.create(
    <Grommet>
      <Button label='Test' onClick={onClick} />
    </Grommet>
  );
  const tree = component.toJSON();

  const button = findAllByType(tree, 'button');
  button[0].props.onClick();
  expect(onClick).toBeCalled();
});
