import React from 'react';
import 'jest-styled-components';
import 'regenerator-runtime/runtime';
import { render } from '@testing-library/react';
import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet, Layer } from '../..';

describe('Layer', () => {
  beforeEach(createPortal);
  const positions = [
    'top',
    'bottom',
    'left',
    'right',
    'start',
    'end',
    'center',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ];

  const fullOptions = [true, false, 'horizontal', 'vertical'];

  positions.forEach((position) =>
    fullOptions.forEach((full) => {
      test(`position: ${position} - full: ${full}`, () => {
        render(
          <Grommet>
            <Layer
              id="position-full-test"
              position={position as any}
              full={full as any}
            >
              This is a layer
            </Layer>
          </Grommet>,
        );
        expectPortal('position-full-test').toMatchSnapshot();
      });

      test(`should render correct border radius for position: ${position} -
			full: ${full}`, () => {
        const theme = {
          layer: {
            border: {
              radius: 'large',
              intelligentRounding: true,
            },
          },
        };
        render(
          <Grommet theme={theme}>
            <Layer
              id="border-radius-test"
              position={position as any}
              full={full as any}
            >
              This is a layer
            </Layer>
          </Grommet>,
        );
        expectPortal('border-radius-test').toMatchSnapshot();
      });
    }),
  );

  ['none', 'xsmall', 'small', 'medium', 'large'].forEach((margin) =>
    test(`margin ${margin}`, () => {
      render(
        <Grommet>
          <Layer id="margin-test" margin={margin}>
            This is a layer
          </Layer>
        </Grommet>,
      );
      expectPortal('margin-test').toMatchSnapshot();
    }),
  );

  test(`should apply background`, () => {
    render(
      <Grommet>
        <Layer id="margin-test" background="brand">
          This is a layer
        </Layer>
      </Grommet>,
    );
    expectPortal('margin-test').toMatchSnapshot();
  });

  test(`custom margin`, () => {
    render(
      <Grommet>
        <Layer
          id="margin-test"
          margin={{ top: '50px', bottom: '40px', left: '30px', right: '20px' }}
        >
          This is a layer
        </Layer>
      </Grommet>,
    );
    expectPortal('margin-test').toMatchSnapshot();
  });
});
