import React from 'react';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { Grommet } from '../../Grommet';
import { CheckBoxGroup } from '..';

describe('CheckBoxGroup', () => {
  afterEach(cleanup);

  test('options renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBoxGroup options={['First', 'Second']} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('value renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBoxGroup value={['First']} options={['First', 'Second']} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('initial value renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBoxGroup
          value={['Maui', 'Jerusalem']}
          options={[
            { label: 'Maui' },
            { label: 'Jerusalem' },
            { label: 'Wuhan' },
          ]}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('disabled renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBoxGroup disabled options={['First', 'Second']} />
        <CheckBoxGroup options={[{ label: 'First', disabled: true }]} />
        <CheckBoxGroup options={[{ label: 'First', disabled: true }]} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
