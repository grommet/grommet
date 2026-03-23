/* eslint-disable max-len */
/**
 * Step 0.6: Runtime Theme Dark Mode Propagation
 *
 * Verifies that theme.dark is correctly set on the ThemeContext value at all
 * levels of the component tree:
 *   - Grommet sets theme.dark based on themeMode prop
 *   - Box re-provisions ThemeContext with updated dark value when background
 *     requires it
 *   - normalizeColor() correctly resolves dark/light color variants from context
 *
 * Audit summary (no conversion required):
 *   Phase 1 components (Text, Heading, Paragraph, Image, Avatar, Tag, Spinner,
 *   Anchor, SkipLink, Nav, Header, Footer, Main, Sidebar, Card, etc.) do NOT
 *   directly read theme.dark in their component logic. They pass the full theme
 *   object to normalizeColor() / backgroundIsDark() which read theme.dark
 *   internally. No prop-passing of theme.dark in Phase 1 components.
 */
import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { grommet } from '../../../themes/grommet';
import { ThemeContext } from '..';
import { Grommet } from '../../../components/Grommet';
import { Box } from '../../../components/Box';
import { normalizeColor } from '../../../utils/colors';

// ─── helpers ─────────────────────────────────────────────────────────────────

/**
 * Captures ThemeContext value from inside a rendered component tree.
 * Returns a ref-like object whose .current is set to the captured context value.
 */
function captureTheme() {
  const captureRef = { current: null };
  const CaptureConsumer = () => {
    captureRef.current = useContext(ThemeContext);
    return null;
  };
  return [CaptureConsumer, captureRef];
}

// ─── Grommet themeMode propagation ───────────────────────────────────────────

describe('ThemeContext dark mode — Grommet themeMode', () => {
  test('themeMode="dark" sets theme.dark to true', () => {
    const [Consumer, ref] = captureTheme();
    render(
      <Grommet theme={grommet} themeMode="dark">
        <Consumer />
      </Grommet>,
    );
    expect(ref.current.dark).toBe(true);
  });

  test('themeMode="light" sets theme.dark to false', () => {
    const [Consumer, ref] = captureTheme();
    render(
      <Grommet theme={grommet} themeMode="light">
        <Consumer />
      </Grommet>,
    );
    expect(ref.current.dark).toBe(false);
  });

  test('default themeMode resolves to light (theme.dark = false)', () => {
    const [Consumer, ref] = captureTheme();
    render(
      <Grommet theme={grommet}>
        <Consumer />
      </Grommet>,
    );
    expect(ref.current.dark).toBe(false);
  });

  test('theme.dark is propagated all the way to leaf consumers', () => {
    const [OuterConsumer, outerRef] = captureTheme();
    const [InnerConsumer, innerRef] = captureTheme();
    render(
      <Grommet theme={grommet} themeMode="dark">
        <OuterConsumer />
        <Box>
          <InnerConsumer />
        </Box>
      </Grommet>,
    );
    expect(outerRef.current.dark).toBe(true);
    expect(innerRef.current.dark).toBe(true);
  });
});

// ─── Box background dark re-provision ────────────────────────────────────────

describe('ThemeContext dark mode — Box background re-provision', () => {
  test('Box with dark background sets theme.dark to true for children', () => {
    const [Consumer, ref] = captureTheme();
    render(
      <Grommet theme={grommet} themeMode="light">
        <Box background="dark-1">
          <Consumer />
        </Box>
      </Grommet>,
    );
    // "dark-1" is a dark background — Box should re-provision with dark=true
    expect(ref.current.dark).toBe(true);
  });

  test('Box with light background inside dark Grommet restores dark=false', () => {
    const [Consumer, ref] = captureTheme();
    render(
      <Grommet theme={grommet} themeMode="dark">
        <Box background="light-1">
          <Consumer />
        </Box>
      </Grommet>,
    );
    // "light-1" is a light background — Box should re-provision with dark=false
    expect(ref.current.dark).toBe(false);
  });

  test('Box without background does not change theme.dark', () => {
    const [Consumer, ref] = captureTheme();
    render(
      <Grommet theme={grommet} themeMode="dark">
        <Box>
          <Consumer />
        </Box>
      </Grommet>,
    );
    expect(ref.current.dark).toBe(true);
  });

  test('nested Boxes accumulate dark mode correctly', () => {
    const [OuterConsumer, outerRef] = captureTheme();
    const [InnerConsumer, innerRef] = captureTheme();
    render(
      <Grommet theme={grommet} themeMode="light">
        {/* outer: dark */}
        <Box background="dark-1">
          <OuterConsumer />
          {/* inner: light again */}
          <Box background="white">
            <InnerConsumer />
          </Box>
        </Box>
      </Grommet>,
    );
    expect(outerRef.current.dark).toBe(true);
    expect(innerRef.current.dark).toBe(false);
  });
});

// ─── normalizeColor + theme.dark ─────────────────────────────────────────────

describe('normalizeColor color resolution with theme.dark', () => {
  test('returns dark variant when theme.dark = true', () => {
    const [Consumer, ref] = captureTheme();
    render(
      <Grommet theme={grommet} themeMode="dark">
        <Consumer />
      </Grommet>,
    );

    // 'text' resolves to { dark: '#f8f8f8', light: '#444444' } in grommet theme
    const color = normalizeColor('text', ref.current);
    // When dark=true, the dark variant should be returned
    expect(color).toBe(ref.current.global.colors.text.dark);
  });

  test('returns light variant when theme.dark = false', () => {
    const [Consumer, ref] = captureTheme();
    render(
      <Grommet theme={grommet} themeMode="light">
        <Consumer />
      </Grommet>,
    );

    const color = normalizeColor('text', ref.current);
    expect(color).toBe(ref.current.global.colors.text.light);
  });

  test('resolves brand color (non-dark/light object) regardless of dark mode', () => {
    const [LightConsumer, lightRef] = captureTheme();
    const [DarkConsumer, darkRef] = captureTheme();

    render(
      <Grommet theme={grommet} themeMode="light">
        <LightConsumer />
      </Grommet>,
    );
    render(
      <Grommet theme={grommet} themeMode="dark">
        <DarkConsumer />
      </Grommet>,
    );

    const lightBrand = normalizeColor('brand', lightRef.current);
    const darkBrand = normalizeColor('brand', darkRef.current);
    // 'brand' is a plain string/color — same value in both modes
    expect(lightBrand).toBe(darkBrand);
    expect(typeof lightBrand).toBe('string');
  });

  test('normalizeColor explicit dark param overrides theme.dark', () => {
    const [Consumer, ref] = captureTheme();
    render(
      // Light mode Grommet
      <Grommet theme={grommet} themeMode="light">
        <Consumer />
      </Grommet>,
    );
    expect(ref.current.dark).toBe(false);

    const textColor = ref.current.global.colors.text;
    if (textColor && textColor.dark && textColor.light) {
      // Passing dark=true explicitly should override theme.dark=false
      expect(normalizeColor('text', ref.current, true)).toBe(textColor.dark);
      // Passing dark=false explicitly should stay with light variant
      expect(normalizeColor('text', ref.current, false)).toBe(textColor.light);
    }
  });
});

// ─── ThemeContext.Extend dark mode preservation ───────────────────────────────

describe('ThemeContext.Extend preserves dark mode', () => {
  test('Extend does not lose theme.dark from parent', () => {
    const [Consumer, ref] = captureTheme();
    render(
      <Grommet theme={grommet} themeMode="dark">
        <ThemeContext.Extend value={{ custom: { color: 'red' } }}>
          <Consumer />
        </ThemeContext.Extend>
      </Grommet>,
    );
    // parent dark mode must survive ThemeContext.Extend
    expect(ref.current.dark).toBe(true);
    // Extended value must also be merged in
    expect(ref.current.custom?.color).toBe('red');
  });

  test('Extend does not lose theme.dark=false from parent', () => {
    const [Consumer, ref] = captureTheme();
    render(
      <Grommet theme={grommet} themeMode="light">
        <ThemeContext.Extend value={{ custom: { color: 'blue' } }}>
          <Consumer />
        </ThemeContext.Extend>
      </Grommet>,
    );
    expect(ref.current.dark).toBe(false);
    expect(ref.current.custom?.color).toBe('blue');
  });
});
