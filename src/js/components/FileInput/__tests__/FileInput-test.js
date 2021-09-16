import React from 'react';
import 'jest-styled-components';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
        <FileInput 
          name="file"
          maxSize={maxSize}
        />
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

  test('multiple max files count', () => {
    const files = [
      new File(['hello'], 'hello.png', {type: 'image/png'}),
      new File(['there'], 'there.png', {type: 'image/png'}),
    ];
    const { container } = render(
      <Grommet>
        <FileInput 
          name="file"
          id="file-uploader"
          multiple={{
            max: 5,
          }}
        />
      </Grommet>,
    );
    const input = container.querySelector("#file-uploader");
    userEvent.upload(input, files);
    expect(input.files).toHaveLength(2);
  });
});
