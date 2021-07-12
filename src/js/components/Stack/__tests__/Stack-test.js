import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Stack } from '..';

const CONTENTS = [<div key={1}>first</div>, <div key={2}>second</div>];

describe('Stack', () => {
  test('default', () => {
    const { container } = render(
      <Grommet>
        <Stack>{CONTENTS}</Stack>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('guidingChild', () => {
    const { container } = render(
      <Grommet>
        <Stack guidingChild="first">{CONTENTS}</Stack>
        <Stack guidingChild="last">{CONTENTS}</Stack>
        <Stack guidingChild={0}>{CONTENTS}</Stack>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('anchor', () => {
    const { container } = render(
      <Grommet>
        <Stack anchor="center">{CONTENTS}</Stack>
        <Stack anchor="top">{CONTENTS}</Stack>
        <Stack anchor="left">{CONTENTS}</Stack>
        <Stack anchor="bottom">{CONTENTS}</Stack>
        <Stack anchor="right">{CONTENTS}</Stack>
        <Stack anchor="top-left">{CONTENTS}</Stack>
        <Stack anchor="bottom-left">{CONTENTS}</Stack>
        <Stack anchor="top-right">{CONTENTS}</Stack>
        <Stack anchor="bottom-right">{CONTENTS}</Stack>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('fill', () => {
    const { container } = render(
      <Grommet>
        <Stack fill>{CONTENTS}</Stack>
        <Stack fill={false}>{CONTENTS}</Stack>
        <Stack fill="horizontal">{CONTENTS}</Stack>
        <Stack fill="vertical">{CONTENTS}</Stack>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('interactiveChild', () => {
    const { container } = render(
      <Grommet>
        <Stack interactiveChild="first">{CONTENTS}</Stack>
        <Stack interactiveChild="last">{CONTENTS}</Stack>
        <Stack interactiveChild={0}>{CONTENTS}</Stack>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
