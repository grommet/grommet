/* eslint-disable max-len */
/**
 * Parses flat CSS declarations (property: value pairs) into a JS object.
 * Does NOT support nested rules, pseudo-selectors, or @-rules —
 * those are detected and warned about by resolveExtend() before this is called.
 * Values containing colons (e.g. rgb(), url()) are handled correctly.
 *
 * @param {string} cssString - Flat CSS declaration string (e.g., "color: red; font-size: 14px;")
 * @returns {Object | undefined} Plain JS style object compatible with React `style` prop
 */
function parseCssStringToObject(cssString) {
  if (!cssString) return undefined;
  return cssString
    .split(';')
    .filter(Boolean)
    .reduce((acc, declaration) => {
      const [prop, ...valueParts] = declaration.split(':');
      if (prop && valueParts.length) {
        const camelProp = prop
          .trim()
          .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        acc[camelProp] = valueParts.join(':').trim();
      }
      return acc;
    }, {});
}

const buildExtendWarning = (extendName, detected) => {
  const target = extendName || 'theme.X.extend';

  if (detected.length > 0) {
    return (
      `[grommet] ${target} contains ${detected.join(' and ')} ` +
      'which cannot be applied via the style prop shim and have been dropped. ' +
      'Migrate to the className prop instead. ' +
      'See the migration guide.'
    );
  }

  return (
    `[grommet] ${target} is deprecated. ` +
    'Use the className prop instead. ' +
    'See the migration guide.'
  );
};

/**
 * Backward-compat shim for theme.X.extend values.
 *
 * Resolves extend values that may be:
 * - String: `"font-weight: bold;"`
 * - Function: `(props) => "color: red;"`
 * - Array: `["font-weight: bold;", (props) => "color: red;"]`
 * - Undefined/null
 *
 * Emits dev warnings for pseudo-selectors (&:hover {}) and @-rules (@media {})
 * which cannot be expressed via the React style prop.
 *
 * @param {string | function | Array | undefined} extend - The extend value from theme
 * @param {Object} props - Runtime props to pass to extend functions
 * @param {string} [extendName='theme.X.extend'] - Theme path for warning ownership
 * @returns {Object | undefined} Plain JS style object compatible with React `style` prop
 */
export function resolveExtend(extend, props, extendName = 'theme.X.extend') {
  if (!extend) return undefined;

  const resolved =
    // eslint-disable-next-line no-nested-ternary
    typeof extend === 'function'
      ? extend(props)
      : Array.isArray(extend)
      ? extend.map((p) => (typeof p === 'function' ? p(props) : p)).join('')
      : String(extend);

  // Detect and warn about rules that cannot be expressed via the style prop.
  if (process.env.NODE_ENV !== 'production') {
    const hasPseudo = /&[\w\s:[\]()>+~*,]+\s*\{/.test(resolved);
    const hasAtRule = /@[\w-]+/.test(resolved);
    const detected = [
      ...(hasPseudo ? ['pseudo-selectors'] : []),
      ...(hasAtRule ? ['@-rules'] : []),
    ];

    console.warn(buildExtendWarning(extendName, detected));
  }

  return parseCssStringToObject(resolved);
}
