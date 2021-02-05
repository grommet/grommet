import React from 'react';
import 'jest-styled-components';
import { render } from '@testing-library/react';

import { Grommet } from '../../Grommet';
import { FileInput } from '..';

describe('FileInput', () => {
  test('basic', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('multiple', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" multiple />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('multiple aggregateThreshold', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" multiple={{ aggregateThreshold: 2 }} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('accept', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" accept="image/*" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" disabled />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('messages', () => {
    const { container } = render(
      <Grommet>
        <FileInput
          name="file"
          messages={{
            browse: 'test browse',
          }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('background', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" background={{ color: 'background-contrast' }} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" border={{ color: 'brand', size: 'large' }} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" pad="small" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('margin', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" margin="small" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
