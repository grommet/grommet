import React from 'react';
import { render } from '@testing-library/react';
import { Grommet } from '../../Grommet';
import { Button } from '..';
import { ThemeType } from '../../../themes';

describe('Button deprecation warnings', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  const deprecatedTheme: ThemeType = {
    global: {
      deprecated: {
        button: {
          kind: [
            {
              name: 'oldKind',
              message: 'oldKind is deprecated. Use newKind instead.',
            },
            {
              name: 'anotherOldKind',
            },
          ],
        },
        colors: [
          {
            name: 'oldColor',
            message: 'oldColor is deprecated. Use newColor instead.',
          },
        ],
      },
    },
  };

  it('should warn when using deprecated kind with custom message', () => {
    render(
      <Grommet theme={deprecatedTheme}>
        <Button kind="oldKind" label="Test" />
      </Grommet>,
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'oldKind is deprecated. Use newKind instead.',
    );
  });

  it('should warn when using deprecated kind with default message', () => {
    render(
      <Grommet theme={deprecatedTheme}>
        <Button kind="anotherOldKind" label="Test" />
      </Grommet>,
    );

    expect(consoleSpy).toHaveBeenCalledWith('anotherOldKind is deprecated.');
  });

  it('should warn when using deprecated color', () => {
    render(
      <Grommet theme={deprecatedTheme}>
        <Button primary color="oldColor" label="Test" />
      </Grommet>,
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'oldColor is deprecated. Use newColor instead.',
    );
  });
});
