import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { MnetUIBase } from '../../MnetUIBase';
import { Heading } from '..';

test('Heading renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Heading />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading level renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Heading level={1} />
      <Heading level={2} />
      <Heading level={3} />
      <Heading level={4} />
      <Heading level="1" />
      <Heading level="2" />
      <Heading level="3" />
      <Heading level="4" />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading size renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Heading level={1} size="small" />
      <Heading level={1} size="medium" />
      <Heading level={1} size="large" />
      <Heading level={1} size="xlarge" />
      <Heading level={2} size="small" />
      <Heading level={2} size="medium" />
      <Heading level={2} size="large" />
      <Heading level={2} size="xlarge" />
      <Heading level={3} size="small" />
      <Heading level={3} size="medium" />
      <Heading level={3} size="large" />
      <Heading level={3} size="xlarge" />
      <Heading level={4} size="small" />
      <Heading level={4} size="medium" />
      <Heading level={4} size="large" />
      <Heading level={4} size="xlarge" />
      <Heading level={1} size="77px" />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading textAlign renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Heading textAlign="start" />
      <Heading textAlign="center" />
      <Heading textAlign="end" />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading margin renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Heading margin="small" />
      <Heading margin="medium" />
      <Heading margin="large" />
      <Heading margin="none" />
      <Heading margin={{ bottom: 'small' }} />
      <Heading margin={{ top: 'small' }} />
      <Heading margin={{ bottom: 'none' }} />
      <Heading margin={{ top: 'none' }} />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading color renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Heading color="brand" />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

const LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';

test('Heading truncate renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Heading truncate={false}>{LONG}</Heading>
      <Heading truncate>{LONG}</Heading>
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('responsive renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Heading responsive />
      <Heading responsive={false} />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Theme based font family renders', () => {
  const customTheme = {
    heading: {
      font: {
        family: 'Fira Sans',
      },
      level: {
        1: {
          font: {
            family: 'Arial',
          },
        },
        2: {
          font: {
            family: 'Roboto',
          },
        },
        3: {
          font: {
            family: 'Ubuntu',
          },
        },
      },
    },
  };
  const component = renderer.create(
    <MnetUIBase theme={customTheme}>
      <Heading level={1} />
      <Heading level={2} />
      <Heading level={3} />
      <Heading level={4} />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Theme based font weight renders', () => {
  const customTheme = {
    heading: {
      weight: 600,
      level: {
        1: {
          font: {
            weight: '700',
          },
        },
        2: {
          font: {
            weight: '400',
          },
        },
        3: {
          font: {
            weight: '200',
          },
        },
      },
    },
  };
  const component = renderer.create(
    <MnetUIBase theme={customTheme}>
      <Heading level={1} />
      <Heading level={2} />
      <Heading level={3} />
      <Heading level={4} />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
