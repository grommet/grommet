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
    const customTheme = {
      fileInput: {
        background: {
          color: 'background-contrast',
        },
      },
    };
    const { container } = render(
      <Grommet theme={customTheme}>
        <FileInput name="file" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border', () => {
    const customTheme = {
      fileInput: {
        border: {
          color: 'brand',
          size: 'large',
        },
      },
    };
    const { container } = render(
      <Grommet theme={customTheme}>
        <FileInput name="file" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad', () => {
    const customTheme = {
      fileInput: {
        pad: 'small',
      },
    };
    const { container } = render(
      <Grommet theme={customTheme}>
        <FileInput name="file" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('margin', () => {
    const customTheme = {
      fileInput: {
        margin: 'small',
      },
    };
    const { container } = render(
      <Grommet theme={customTheme}>
        <FileInput name="file" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom theme input font size', () => {
    const { container } = render(
      <Grommet theme={{ global: { input: { font: { size: '16px' } } } }}>
        <FileInput />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('maxSize', () => {
    const maxSize = 5000000;
    const { container } = render(
      <Grommet>
        <FileInput name="file" maxSize={maxSize} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('multiple max', () => {
    const { container } = render(
      <Grommet>
        <FileInput
          name="file"
          multiple={{
            max: 5,
          }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
