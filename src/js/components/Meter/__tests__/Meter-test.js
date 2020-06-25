import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Meter } from '..';

const VALUES = [{ value: 20, label: 'twenty', onHover: () => {} }];

describe('Meter', () => {
  test('default', () => {
    const component = renderer.create(
      <Grommet>
        <Meter />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('basic', () => {
    const component = renderer.create(
      <Grommet>
        <Meter values={VALUES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('many values', () => {
    const component = renderer.create(
      <Grommet>
        <Meter
          values={[
            { value: 5 },
            { value: 5 },
            { value: 5 },
            { value: 5 },
            { value: 5 },
            { value: 5 },
            { value: 5 },
            { value: 5 },
          ]}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('type', () => {
    const component = renderer.create(
      <Grommet>
        <Meter type="bar" values={VALUES} />
        <Meter type="circle" values={VALUES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('size', () => {
    const component = renderer.create(
      <Grommet>
        <Meter size="xsmall" values={VALUES} />
        <Meter size="small" values={VALUES} />
        <Meter size="medium" values={VALUES} />
        <Meter size="large" values={VALUES} />
        <Meter size="xlarge" values={VALUES} />
        <Meter size="24px" values={VALUES} />
        <Meter type="circle" size="xsmall" values={VALUES} />
        <Meter type="circle" size="small" values={VALUES} />
        <Meter type="circle" size="medium" values={VALUES} />
        <Meter type="circle" size="large" values={VALUES} />
        <Meter type="circle" size="xlarge" values={VALUES} />
        <Meter type="circle" size="55px" values={VALUES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('thickness', () => {
    const component = renderer.create(
      <Grommet>
        <Meter thickness="xsmall" values={VALUES} />
        <Meter thickness="small" values={VALUES} />
        <Meter thickness="medium" values={VALUES} />
        <Meter thickness="large" values={VALUES} />
        <Meter thickness="xlarge" values={VALUES} />
        <Meter thickness="55px" values={VALUES} />
        <Meter type="circle" thickness="xsmall" values={VALUES} />
        <Meter type="circle" thickness="small" values={VALUES} />
        <Meter type="circle" thickness="medium" values={VALUES} />
        <Meter type="circle" thickness="large" values={VALUES} />
        <Meter type="circle" thickness="xlarge" values={VALUES} />
        <Meter type="circle" thickness="55px" values={VALUES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('round', () => {
    const component = renderer.create(
      <Grommet>
        <Meter round values={VALUES} />
        <Meter type="circle" round values={VALUES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('background', () => {
    const component = renderer.create(
      <Grommet>
        <Meter background="light-3" values={VALUES} />
        <Meter
          background={{ color: 'light-3', opacity: 'medium' }}
          values={VALUES}
        />
        <Meter type="circle" background="light-3" values={VALUES} />
        <Meter
          type="circle"
          background={{ color: 'light-3', opacity: 'medium' }}
          values={VALUES}
        />
        <Meter
          background={{ color: 'light-3', opacity: 0.2 }}
          values={VALUES}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
