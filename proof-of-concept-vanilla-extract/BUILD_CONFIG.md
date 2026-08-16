# Build Configuration for Vanilla Extract

## Required Dependencies

```json
{
  "dependencies": {
    "classnames": "^2.3.2"
  },
  "devDependencies": {
    "@vanilla-extract/css": "^1.14.0",
    "@vanilla-extract/recipes": "^0.5.0",
    "@vanilla-extract/webpack-plugin": "^2.3.0",
    "mini-css-extract-plugin": "^2.7.6"
  }
}
```

## Installation

```bash
npm install @vanilla-extract/css @vanilla-extract/recipes
npm install -D @vanilla-extract/webpack-plugin mini-css-extract-plugin
```

## Webpack Configuration

```javascript
// webpack.config.js
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    // Vanilla Extract plugin
    new VanillaExtractPlugin(),

    // Extract CSS to separate file
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false, // Don't resolve url() in CSS
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css.ts'],
  },
};
```

## TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["@vanilla-extract/css/types"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.css.ts"]
}
```

## File Structure

```
src/
├── theme/
│   ├── theme.contract.css.ts    # Theme contract
│   └── grommet.theme.css.ts     # Theme implementation
│
├── components/
│   └── Button/
│       ├── button.css.ts        # Button styles
│       ├── Button.tsx           # Button component
│       └── index.ts             # Exports
│
└── index.ts
```

## Vite Configuration

If using Vite instead of webpack:

```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
});
```

```bash
npm install -D @vanilla-extract/vite-plugin
```

## Next.js Configuration

For Next.js projects:

```javascript
// next.config.js
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

module.exports = withVanillaExtract({
  // Your Next.js config
});
```

```bash
npm install @vanilla-extract/next-plugin
```

## ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    // ... your existing config
  ],
  overrides: [
    {
      files: ['*.css.ts'],
      rules: {
        // Disable rules that don't apply to style files
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
```

## Jest Configuration

```javascript
// jest.config.js
module.exports = {
  // ... your existing config

  moduleNameMapper: {
    // Mock Vanilla Extract imports
    '\\.css\\.ts$': '<rootDir>/__mocks__/styleMock.js',
  },

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
```

```javascript
// __mocks__/styleMock.js
module.exports = new Proxy(
  {},
  {
    get: (target, prop) => {
      return prop;
    },
  },
);
```

## Storybook Configuration

```javascript
// .storybook/main.js
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // ... your existing config

  webpackFinal: async (config) => {
    // Add Vanilla Extract plugin
    config.plugins.push(new VanillaExtractPlugin());
    config.plugins.push(new MiniCssExtractPlugin());

    // Add rule for CSS files
    config.module.rules.push({
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    });

    return config;
  },
};
```

## Build Scripts

```json
// package.json
{
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.tsx"
  }
}
```

## Development Workflow

1. **Start development server**:

   ```bash
   npm run dev
   ```

2. **Type checking** (in watch mode):

   ```bash
   npm run type-check -- --watch
   ```

3. **Lint code**:

   ```bash
   npm run lint
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## CSS Output

Vanilla Extract generates static CSS files:

```
dist/
├── button.css           # Extracted Button styles
├── main.js             # JavaScript bundle
└── index.html          # HTML file

# button.css (generated)
.button_base__xyz123 {
  display: inline-block;
  padding: 4px 22px;
  border-radius: 18px;
}

.button_primary__abc456 {
  background: #7D4CDB;
  color: #FFFFFF;
}
```

## Debugging

### VS Code Settings

```json
// .vscode/settings.json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "files.associations": {
    "*.css.ts": "typescript"
  }
}
```

### Browser DevTools

Vanilla Extract generates readable class names in development:

```css
/* Development mode */
.button_base__12ab34cd
.button_primary__56ef78gh

/* Production mode (with minification) */
.a
.b;
```

## Performance Optimizations

### Code Splitting

```typescript
// Lazy load theme
const theme = import('./grommet.theme.css');

// Apply theme dynamically
document.documentElement.classList.add(await theme.lightTheme);
```

### Tree Shaking

Vanilla Extract automatically tree-shakes unused styles:

```typescript
// Only used styles are included in bundle
import { buttonRecipe } from './button.css';

// If you only use 'primary', other variants are removed
<button className={buttonRecipe({ kind: 'primary' })} />;
```

### CSS Minification

```javascript
// webpack.config.js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      '...', // Extend existing minimizers
      new CssMinimizerPlugin(),
    ],
  },
};
```

## Troubleshooting

### Common Issues

1. **Import errors**: Make sure `.css.ts` files are properly configured in webpack
2. **Type errors**: Ensure `@vanilla-extract/css/types` is in tsconfig
3. **Build errors**: Check that plugins are in correct order
4. **Style not applying**: Verify theme class is applied to root element

### Build Performance

If builds are slow:

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
```

## Migration Checklist

- [ ] Install Vanilla Extract dependencies
- [ ] Configure webpack/vite
- [ ] Set up TypeScript config
- [ ] Create theme contract
- [ ] Implement themes
- [ ] Convert styled-components to `.css.ts`
- [ ] Update components
- [ ] Configure Jest
- [ ] Configure Storybook
- [ ] Test build pipeline
- [ ] Update CI/CD

## Resources

- [Vanilla Extract Documentation](https://vanilla-extract.style/)
- [Vanilla Extract GitHub](https://github.com/vanilla-extract-css/vanilla-extract)
- [Recipes Documentation](https://vanilla-extract.style/documentation/packages/recipes/)
- [Sprinkles Documentation](https://vanilla-extract.style/documentation/packages/sprinkles/)
