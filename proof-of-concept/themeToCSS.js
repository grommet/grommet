/**
 * Utility to convert Grommet theme objects to CSS custom properties
 *
 * This enables the migration from styled-components to CSS Modules
 * by making theme values available as CSS variables.
 */

/**
 * Normalize a color value from the theme
 * Handles both direct colors and color objects with dark/light modes
 */
const normalizeColorValue = (value, mode = 'light') => {
  if (typeof value === 'object' && value !== null) {
    return value[mode] || value.light || value.dark;
  }
  return value;
};

/**
 * Convert a nested object path to a CSS variable name
 * Example: { button: { padding: { vertical: '4px' } } }
 * becomes: --button-padding-vertical: 4px;
 */
const objectToCSSVariables = (obj, prefix = '', mode = 'light') => {
  const variables = {};

  const process = (current, path) => {
    if (current === null || current === undefined) {
      return;
    }

    // Handle primitive values
    if (typeof current !== 'object' || Array.isArray(current)) {
      const varName = `--${path.replace(/\./g, '-')}`;
      variables[varName] = String(current);
      return;
    }

    // Handle objects with dark/light modes
    if (current.dark !== undefined || current.light !== undefined) {
      const varName = `--${path.replace(/\./g, '-')}`;
      variables[varName] = normalizeColorValue(current, mode);
      return;
    }

    // Recursively process nested objects
    Object.keys(current).forEach((key) => {
      // Skip functions and certain keys
      if (typeof current[key] === 'function') return;
      if (key === 'extend') return; // styled-components specific

      const newPath = path ? `${path}.${key}` : key;
      process(current[key], newPath);
    });
  };

  process(obj, prefix);
  return variables;
};

/**
 * Generate CSS string from theme object
 */
export const themeToCSS = (theme, mode = 'light') => {
  const variables = objectToCSSVariables(theme, '', mode);

  // Convert to CSS string
  const cssLines = Object.entries(variables).map(
    ([key, value]) => `  ${key}: ${value};`,
  );

  return `:root {\n${cssLines.join('\n')}\n}`;
};

/**
 * Generate a style tag with CSS variables from theme
 * Use this in the Grommet component to inject theme variables
 */
export const generateThemeStyleTag = (theme, mode = 'light') => {
  const css = themeToCSS(theme, mode);
  const styleId = `grommet-theme-${mode}`;

  // Check if we're in a browser environment
  if (typeof document !== 'undefined') {
    let styleTag = document.getElementById(styleId);

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = css;
  }

  return css;
};

/**
 * React hook to inject theme CSS variables
 * Use this in the Grommet provider component
 */
export const useThemeCSSVariables = (theme, mode = 'light') => {
  if (typeof window === 'undefined') return null;

  const css = themeToCSS(theme, mode);

  return css;
};

/**
 * Generate TypeScript definitions for CSS variables
 * Useful for IDE autocomplete
 */
export const generateCSSVariableTypes = (theme) => {
  const variables = objectToCSSVariables(theme);
  const varNames = Object.keys(variables);

  return `// Auto-generated CSS variable types
export type ThemeCSSVariable = 
${varNames.map((v) => `  | '${v}'`).join('\n')};

export const cssVars: Record<ThemeCSSVariable, string> = {
${varNames.map((v) => `  '${v}': 'var(${v})'`).join(',\n')}
};
`;
};

/**
 * Example usage in Grommet component:
 *
 * import { generateThemeStyleTag } from './themeToCSS';
 *
 * const Grommet = ({ theme, children }) => {
 *   useEffect(() => {
 *     generateThemeStyleTag(theme, 'light');
 *   }, [theme]);
 *
 *   return <div className="grommet">{children}</div>;
 * };
 */

/**
 * Helper to get a CSS variable reference
 */
export const cssVar = (path) => {
  return `var(--${path.replace(/\./g, '-')})`;
};

/**
 * Helper to access nested theme values for fallbacks
 * Useful when a CSS variable might not exist
 */
export const getCSSVarWithFallback = (path, fallback) => {
  return `var(--${path.replace(/\./g, '-')}, ${fallback})`;
};

// Example output for button theme:
// :root {
//   --button-padding-vertical: 4px;
//   --button-padding-horizontal: 22px;
//   --button-border-radius: 18px;
//   --button-border-width: 2px;
//   --button-size-small-pad-vertical: 4px;
//   --button-size-small-pad-horizontal: 20px;
//   --button-size-medium-pad-vertical: 4px;
//   --button-size-medium-pad-horizontal: 22px;
//   --button-size-large-pad-vertical: 8px;
//   --button-size-large-pad-horizontal: 32px;
//   --button-active-background: #dddddd80;
//   --button-active-color: #000000;
//   --button-disabled-opacity: 0.3;
//   --button-transition-timing: ease-in-out;
//   --button-transition-duration: 0.1;
//   ... etc
// }
