import { css } from 'styled-components';
import { deepFreeze } from '../utils/object';
export var hacktoberfest2022 = deepFreeze({
  defaultMode: 'dark',
  global: {
    colors: {
      background: '#160F1D',
      'background-back': '#000000',
      'background-front': '#160F1D',
      'text-strong': '#FFFFFF',
      text: '#E4E1E6',
      'text-weak': '#76717A',
      grey: '#AFACB2',
      lime: '#C6FC60',
      pink: '#D856A7',
      purple: '#7C7EF4',
      teal: '#73DAFB',
      yellow: '#EDD063',
      darkPurple: '#291E40',
      active: 'purple',
      focus: '#233670',
      brand: 'lime',
      control: 'teal',
      'graph-0': 'yellow',
      'graph-1': 'purple',
      'graph-2': 'teal',
      'graph-3': 'pink',
      'graph-4': 'lime',
      // clear unused colors
      icon: undefined,
      'accent-1': undefined,
      'accent-2': undefined,
      'accent-3': undefined,
      'accent-4': undefined,
      'neutral-1': undefined,
      'neutral-2': undefined,
      'neutral-3': undefined,
      'neutral-4': undefined,
      'neutral-5': undefined,
      'light-1': undefined,
      'light-2': undefined,
      'light-3': undefined,
      'light-4': undefined,
      'light-5': undefined,
      'light-6': undefined,
      'dark-1': undefined,
      'dark-2': undefined,
      'dark-3': undefined,
      'dark-4': undefined,
      'dark-5': undefined,
      'dark-6': undefined
    },
    backgrounds: {
      'gradient-purple-teal': {
        image: "linear-gradient(\n          #7C7EF4 0%,\n          #73DAFB 100%\n        );"
      },
      'gradient-teal-purple': {
        image: "linear-gradient(\n          #73DAFB 0%,\n          #7C7EF4 100%\n        );"
      },
      'gradient-yellow-teal-purple': {
        image: "linear-gradient(\n          #EDD063 0%,\n          #73DAFB 50%,\n          #7C7EF4 100%\n        );",
        rotate: 90
      },
      'gradient-yellow-teal': {
        image: "linear-gradient(\n          #EDD063 0%,\n          #73DAFB 100%\n        );",
        rotate: 90
      }
    },
    focus: {
      shadow: {
        color: 'focus',
        size: '3px'
      }
    },
    font: {
      family: '"JetBrains Mono", monospace',
      face: "/* latin */\n@font-face {\n  font-family: 'JetBrains Mono';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOTk6OThhvA.woff) format('woff');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}"
    }
  },
  grommet: {
    extend: css(["text-transform:uppercase;"])
  },
  anchor: {
    color: 'text',
    hover: {
      color: 'text-strong'
    }
  },
  button: {
    border: {
      width: '0px',
      radius: '0px'
    },
    padding: {
      horizontal: '20px',
      vertical: '10px'
    },
    color: 'text-strong',
    size: {
      small: {
        pad: {
          horizontal: '16px',
          vertical: '8px'
        }
      },
      medium: {
        pad: {
          horizontal: '20px',
          vertical: '10px'
        }
      }
    },
    "default": {
      color: 'text-strong'
    },
    primary: {
      border: false,
      background: 'gradient-yellow-teal-purple',
      color: 'text'
    },
    hover: {
      border: false
    },
    extend: css(["clip-path:polygon( 12px 0px,100% 0px,100% 72%,calc(100% - 12px) 100%,0px 100%,0px 12px );text-transform:uppercase;&:focus{clip-path:none;}"])
  },
  heading: {
    extend: css(["text-shadow:rgba(255,215,77,0.6) -1px -1px 6px,rgba(124,127,255,0.6) 1px 1px 6px;"])
  }
});