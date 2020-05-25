import React from 'react';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { MnetUIBase } from '../../MnetUIBase';
import { CheckBoxGroup } from '..';

describe('CheckBoxGroup', () => {
  afterEach(cleanup);

  test('options renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <CheckBoxGroup options={['First', 'Second']} />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('value renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <CheckBoxGroup value={['First']} options={['First', 'Second']} />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('initial value renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <CheckBoxGroup
          value={['Wuhan', 'Jerusalem']}
          options={[
            { label: 'Maui', value: 'Maui' },
            { label: 'Jerusalem', value: 'Jerusalem' },
            { label: 'Wuhan', value: 'Wuhan' },
          ]}
        />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('disabled renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <CheckBoxGroup disabled options={['First', 'Second']} />
        <CheckBoxGroup options={[{ label: 'First', disabled: true }]} />
        <CheckBoxGroup options={[{ label: 'First', disabled: true }]} />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
