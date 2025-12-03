import React from 'react';
import { render } from '@testing-library/react';
import { Grommet } from '../../Grommet';
import { ThemeType } from '../../../themes';
import { Box } from '..';

describe('Box deprecation warnings', () => {
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
        backgrounds: [
          {
            name: 'oldBackground',
            message: 'oldBackground is deprecated. Use newBackground instead.',
          },
          {
            name: 'anotherOldBackground',
          },
        ],
      },
    },
  };

  it('should warn with deprecated background + custom message', () => {
    render(
      <Grommet theme={deprecatedTheme}>
        <Box background="oldBackground">Test content</Box>
      </Grommet>,
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'oldBackground is deprecated. Use newBackground instead.',
    );
  });

  it('should warn with deprecated background + default message', () => {
    render(
      <Grommet theme={deprecatedTheme}>
        <Box background="anotherOldBackground" />
      </Grommet>,
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'The background anotherOldBackground is deprecated.',
    );
  });

  it('should warn for deprecated background object with light color', () => {
    const themeWithObjectBackground = {
      global: {
        deprecated: {
          colors: [
            {
              name: 'oldLightColor',
              message: 'oldLightColor is deprecated.',
            },
          ],
        },
      },
    };

    render(
      <Grommet theme={themeWithObjectBackground}>
        <Box background={{ light: 'oldLightColor', dark: 'brand' }}>
          Test content
        </Box>
      </Grommet>,
    );

    expect(consoleSpy).toHaveBeenCalledWith('oldLightColor is deprecated.');
  });
});
