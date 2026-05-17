# Build Configuration Changes

This document outlines the build configuration changes needed to support CSS Modules.

## Package.json Changes

### Dependencies to Remove

```json
{
  "dependencies": {
    "styled-components": "^6.x.x" // REMOVE
  }
}
```

### Dependencies to Add

```json
{
  "dependencies": {
    "classnames": "^2.3.2" // For className composition
  },
  "devDependencies": {
    "typescript": "^5.x.x", // For .d.ts generation (if not already present)
    "typed-css-modules": "^0.9.1" // Auto-generate .d.ts for CSS Modules
  }
}
```

### Scripts to Add

```json
{
  "scripts": {
    "generate:css-types": "tcm src -w", // Watch and generate .d.ts files
    "build:css": "tcm src" // Generate .d.ts files once
  }
}
```

## Webpack Configuration

### Current (styled-components)

```javascript
// webpack.config.babel.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
```

### Updated (CSS Modules)

```javascript
// webpack.config.babel.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // ADD: CSS Module support
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      // Regular CSS (non-module)
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

## PostCSS Configuration

Create `postcss.config.js`:

```javascript
module.exports = {
  plugins: [
    'postcss-import',
    'postcss-custom-properties',
    'autoprefixer',
    'cssnano',
  ],
};
```

Install PostCSS plugins:

```bash
npm install -D postcss postcss-loader postcss-import postcss-custom-properties autoprefixer cssnano
```

## TypeScript Configuration

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-plugin-css-modules"
      }
    ]
  }
}
```

Install TypeScript plugin:

```bash
npm install -D typescript-plugin-css-modules
```

## Babel Configuration

No changes needed if you're already transpiling JSX. CSS Modules are handled by webpack.

## ESLint Configuration

Update `.eslintrc` to work with CSS Modules:

```javascript
module.exports = {
  rules: {
    // Allow importing .css files
    'import/no-unresolved': ['error', { ignore: ['\\.module\\.css$'] }],
  },
};
```

## Jest Configuration (for testing)

Update `jest.config.js`:

```javascript
module.exports = {
  // ... existing config
  moduleNameMapper: {
    // Mock CSS Modules
    '\\.module\\.css$': 'identity-obj-proxy',
    // Regular CSS
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
  },
};
```

Install identity-obj-proxy:

```bash
npm install -D identity-obj-proxy
```

Create `__mocks__/styleMock.js`:

```javascript
module.exports = {};
```

## Storybook Configuration

Update `.storybook/main.js`:

```javascript
module.exports = {
  // ... existing config
  webpackFinal: async (config) => {
    // Add CSS Module support
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        },
        'postcss-loader',
      ],
    });

    return config;
  },
};
```

## VS Code Configuration

Create `.vscode/settings.json` (or update existing):

```json
{
  "css.validate": true,
  "css.lint.unknownAtRules": "ignore",
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## Build Output Changes

### Before (styled-components)

```
dist/
├── index.js              (includes styled-components runtime)
├── components/
│   └── Button/
│       ├── Button.js     (with styled components)
│       └── index.js
```

### After (CSS Modules)

```
dist/
├── index.js              (no styled-components)
├── index.css             (all component styles)
├── components/
│   └── Button/
│       ├── Button.js     (with className)
│       ├── Button.module.css
│       └── index.js
```

## CSS Extraction for Production

For better performance, extract CSS to separate files:

```javascript
// webpack.config.babel.js (production)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Instead of style-loader
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
};
```

Install:

```bash
npm install -D mini-css-extract-plugin
```

## Performance Optimizations

### CSS Minification

```javascript
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
};
```

### Tree Shaking for CSS

CSS Modules naturally support tree shaking - unused classes won't be in the final bundle.

### Critical CSS Extraction

For SSR, consider extracting critical CSS:

```bash
npm install -D critters-webpack-plugin
```

## Bundle Size Comparison

Expected bundle sizes (gzipped):

| Component                 | Before      | After     | Savings  |
| ------------------------- | ----------- | --------- | -------- |
| styled-components runtime | 18KB        | 0KB       | -18KB    |
| Button component          | 8KB         | 5KB       | -3KB     |
| Button styles             | 0KB (in JS) | 2KB (CSS) | N/A      |
| **Total**                 | **26KB**    | **7KB**   | **-73%** |

## Migration Checklist

- [ ] Install new dependencies (classnames, css-loader, etc.)
- [ ] Remove styled-components
- [ ] Update webpack config for CSS Modules
- [ ] Add PostCSS configuration
- [ ] Update TypeScript config (if using TS)
- [ ] Update Jest config for testing
- [ ] Update Storybook config
- [ ] Add CSS type generation script
- [ ] Test build pipeline
- [ ] Update documentation

## Gradual Migration

Both styled-components and CSS Modules can coexist during migration:

```javascript
// webpack.config.babel.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      // CSS Modules for new/migrated components
      {
        test: /\.module\.css$/,
        use: ['style-loader', 'css-loader?modules', 'postcss-loader'],
      },
    ],
  },
  // Keep styled-components for un-migrated components
  // (will be in node_modules)
};
```

## Verification

After setup, verify:

```bash
# 1. Build succeeds
npm run build

# 2. CSS types are generated
npm run generate:css-types

# 3. Tests pass
npm test

# 4. Storybook works
npm run storybook

# 5. Check bundle size
npm run build && ls -lh dist/
```

## Resources

- [CSS Modules GitHub](https://github.com/css-modules/css-modules)
- [webpack CSS Loader](https://webpack.js.org/loaders/css-loader/)
- [PostCSS](https://postcss.org/)
- [TypeScript CSS Modules](https://github.com/mrmckeb/typescript-plugin-css-modules)
- [classnames library](https://github.com/JedWatson/classnames)
