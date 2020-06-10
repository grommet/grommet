// NOTE: This file is just here temporarily to evaluate these changes.
// It is a copy of the NEXT grommet-theme-hpe adjusted for changes.
// (C) Copyright 2020-2021 Hewlett Packard Enterprise Development LP
import { css } from 'styled-components';
import { FormDown } from "grommet-icons/es6/icons/FormDown";
import { FormUp } from "grommet-icons/es6/icons/FormUp";

var isObject = function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
};

var deepFreeze = function deepFreeze(obj) {
  Object.keys(obj).forEach(function (key) {
    return key && isObject(obj[key]) && Object.freeze(obj[key]);
  });
  return Object.freeze(obj);
};

export var hpe = deepFreeze({
  defaultMode: 'light',
  global: {
    colors: {
      /* deprecated accent and neutral colors */
      'accent-1': undefined,
      'accent-2': undefined,
      'accent-3': undefined,
      'accent-4': undefined,
      'neutral-1': undefined,
      'neutral-2': undefined,
      'neutral-3': undefined,
      'neutral-4': undefined,
      brand: 'green!',
      background: {
        dark: '#263040',
        light: '#FFFFFF'
      },
      'background-back': {
        dark: '#263040',
        light: '#EFEFEF'
      },
      'background-front': {
        dark: '#404B5C',
        light: '#FFFFFF'
      },
      'background-contrast': {
        dark: '#FFFFFF14',
        light: '#0000000A'
      },
      icon: 'text',
      text: {
        dark: '#C0CADC',
        light: '#444444'
      },
      'text-strong': {
        dark: '#FFFFFF',
        light: '#000000'
      },
      'text-weak': {
        dark: '#606B7D',
        light: '#BBBBBB'
      },
      border: {
        dark: '#7887A1',
        light: '#999999'
      },
      'border-strong': {
        dark: '#AFBCD2',
        light: '#666666'
      },
      'border-weak': {
        dark: '#606B7D',
        light: '#BBBBBB'
      },
      control: 'green',
      'active-background': 'background-contrast',
      'active-text': 'text',
      'disabled-text': {
        dark: '#777777',
        light: '#999999'
      },
      'selected-background': 'green',
      'selected-text': 'text-strong',
      'status-critical': {
        dark: 'red!',
        light: 'red'
      },
      'status-warning': 'orange',
      'status-ok': 'green',
      'status-unknown': {
        dark: '#4F5F76',
        light: '#CCCCCC'
      },
      'status-disabled': '#CCCCCC',
      blue: {
        dark: '#00567A',
        light: '#00C8FF'
      },
      'blue!': '#00739D',
      green: {
        dark: '#008567',
        light: '#17EBA0'
      },
      'green!': '#01A982',
      teal: {
        dark: '#117B82',
        light: '#82FFF2'
      },
      'teal!': '#00E8CF',
      purple: {
        dark: '#6633BC',
        light: '#F740FF'
      },
      'purple!': '#7630EA',
      red: {
        dark: '#A2423D',
        light: '#FC6161'
      },
      'red!': '#C54E4B',
      orange: {
        dark: '#9B6310',
        light: '#FFBC44'
      },
      'orange!': '#FF8300',
      yellow: {
        dark: '#8D741C',
        light: '#FFEB59'
      },
      'yellow!': '#FEC901',
      'graph-0': 'orange!',
      'graph-1': 'blue!',
      'graph-2': 'purple!',
      'graph-3': 'yellow!',
      'graph-4': 'teal!',
      focus: 'teal!',
      placeholder: 'text-weak'
    },
    input: {
      font: {
        height: 'inherit',
        weight: 400
      },
      padding: {
        horizontal: 'small',
        vertical: 'xsmall'
      }
    },
    font: {
      family: "'Metric', Arial, sans-serif",
      face: "\n        @font-face {\n          font-family: \"Metric\";\n          src: url(\"https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXS-Regular.woff2\") format('woff2'),\n               url(\"https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXS-Regular.woff\") format('woff');\n        }\n        @font-face {\n          font-family: \"Metric\";\n          src: url(\"https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXS-Bold.woff2\") format('woff2'),\n               url(\"https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXS-Bold.woff\") format('woff');\n          font-weight: 700;\n        }\n        @font-face {\n          font-family: \"Metric\";\n          src: url(\"https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSSemibold-Regular.woff2\") format('woff2'),\n               url(\"https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSSemibold-Regular.woff\") format('woff');\n          font-weight: 600;\n        }\n        @font-face {\n          font-family: \"Metric\";\n          src: url(\"https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSMedium-Regular.woff2\") format('woff2'),\n               url(\"https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSMedium-Regular.woff\") format('woff');\n          font-weight: 500;\n        }\n        @font-face {\n          font-family: \"Metric\";\n          src: url(\"https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSLight-Regular.woff2\") format('woff2'),\n               url(\"https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSLight-Regular.woff\") format('woff');\n          font-weight: 100;\n        }"
    },
    focus: {
      border: undefined
    },
    active: {
      background: 'active-background',
      color: 'active-text'
    },
    drop: {
      background: 'background-front',
      border: {
        radius: '4px'
      },
      shadowSize: 'medium'
    },
    elevation: {
      // Elevation values were derived from this Figma file.
      // https://www.figma.com/file/eZYR3dtWdb9U90QvJ7p3T9/HPE-Color-Styles?node-id=405%3A25
      // Naming in Figma file is strong/default/weak vs. Grommet t-shirt sizing.
      // As defined here, default is currently mapping to medium.
      light: {
        small: '0px 2px 4px #0000001F;',
        medium: '0px 6px 12px #0000003D;',
        large: '0px 12px 24px #0000001F;'
      },
      dark: {
        small: '0px 2px 4px #0000003D;',
        medium: '0px 6px 12px #0000005C;',
        large: '0px 12px 24px #0000007A;'
      }
    },
    hover: {
      background: 'active-background',
      color: 'active-text'
    },
    selected: {
      background: 'selected-background',
      color: 'selected-text'
    }
  },
  accordion: {
    panel: {
      border: {
        side: 'horizontal',
        color: 'text'
      }
    },
    heading: {
      margin: {
        vertical: 'medium',
        horizontal: 'xsmall'
      }
    },
    hover: {
      heading: {
        color: undefined
      }
    },
    border: undefined,
    icons: {
      color: 'text'
    }
  },
  anchor: {
    color: 'text',
    textDecoration: 'underline',
    fontWeight: 500,
    hover: {
      textDecoration: 'underline'
    }
  },
  button: {
    "default": {
      color: 'text',
      border: undefined,
      padding: {
        horizontal: '12px',
        vertical: '6px'
      },
      font: {
        weight: 700
      }
    },
    primary: {
      background: {
        color: 'green'
      },
      border: undefined,
      color: 'text-strong',
      padding: {
        horizontal: '12px',
        vertical: '6px'
      }
    },
    secondary: {
      border: {
        color: 'green',
        width: '2px'
      },
      color: 'text',
      padding: {
        horizontal: '10px',
        vertical: '4px'
      }
    },
    option: {
      color: 'text',
      border: undefined,
      padding: {
        horizontal: '12px',
        vertical: '6px'
      },
      font: {
        weight: 400
      }
    },
    active: {
      background: {
        color: 'background-contrast'
      },
      color: 'text',
      secondary: {
        border: {
          color: 'transparent'
        }
      },
      option: {
        background: {
          color: 'active-background'
        }
      }
    },
    selected: {
      option: {
        background: 'selected-background',
        color: 'selected-text'
      }
    },
    disabled: {
      background: {
        color: 'transparent'
      },
      color: 'text-weak',
      primary: {
        border: {
          color: 'text-weak',
          width: '2px'
        },
        padding: {
          horizontal: '10px',
          vertical: '4px'
        }
      },
      secondary: {
        border: {
          color: 'text-weak'
        }
      },
      opacity: 1.0
    },
    hover: {
      "default": {
        background: {
          color: 'background-contrast'
        },
        color: undefined
      },
      secondary: {
        border: {
          width: '3px'
        },
        padding: {
          horizontal: '9px',
          vertical: '3px'
        }
      },
      option: {
        background: 'active-background',
        color: 'active-text'
      }
    },
    size: {
      small: {
        border: {
          radius: '4px'
        },
        pad: {
          vertical: '4px',
          horizontal: '8px'
        }
      },
      medium: {
        border: {
          radius: '4px'
        },
        pad: {
          vertical: '4px',
          horizontal: '10px'
        }
      },
      large: {
        border: {
          radius: '6px'
        },
        pad: {
          vertical: '6px',
          horizontal: '16px'
        }
      }
    },
    border: {
      radius: '4px'
    },
    color: 'text-strong',
    padding: {
      vertical: '4px',
      horizontal: '10px'
    }
  },
  calendar: {
    small: {
      fontSize: '13.6px',
      lineHeight: 1.375,
      daySize: '27.43px'
    },
    medium: {
      fontSize: '18px',
      lineHeight: 1.45,
      daySize: '54.86px'
    },
    large: {
      fontSize: '31.2px',
      lineHeight: 1.11,
      daySize: '109.71px'
    }
  },
  checkBox: {
    hover: {
      border: {
        color: undefined
      },
      background: {
        color: 'background-contrast'
      }
    },
    color: 'background',
    border: {
      color: 'border',
      width: '1px'
    },
    check: {
      radius: '2px',
      extend: function extend(_ref) {
        var theme = _ref.theme,
            checked = _ref.checked,
            indeterminate = _ref.indeterminate;
        return "\n      box-shadow: none;\n      border-color: unset;\n      background-color: " + (checked || indeterminate ? theme.global.colors.green[theme.dark ? 'dark' : 'light'] : theme.global.colors.background[theme.dark ? 'dark' : 'light']) + ";\n      " + ((checked || indeterminate) && 'border: none;') + "\n        ";
      }
    },
    icon: {
      extend: function extend(_ref2) {
        var theme = _ref2.theme;
        return "stroke-width: 2px;\n      stroke: " + theme.global.colors['text-strong'][theme.dark ? 'dark' : 'light'];
      }
    },
    gap: 'small',
    toggle: {
      background: 'background',
      color: 'background',
      knob: {
        extend: function extend(_ref3) {
          var theme = _ref3.theme;
          return "\n           box-shadow: " + theme.global.elevation[theme.dark ? 'dark' : 'light'].small + ";\n           border: 1px solid " + theme.global.colors.border[theme.dark ? 'dark' : 'light'] + "\n        ";
        }
      },
      extend: function extend(_ref4) {
        var checked = _ref4.checked,
            theme = _ref4.theme;
        return "\n        " + (checked && "background-color: " + theme.global.colors.green[theme.dark ? 'dark' : 'light'] + ";") + "\n      ";
      }
    },
    extend: function extend(_ref5) {
      var theme = _ref5.theme;
      return "\n      :hover {\n        background-color: " + theme.global.colors['background-contrast'][theme.dark ? 'dark' : 'light'] + ";\n      }\n      width: auto;\n      padding: " + theme.global.edgeSize.xsmall + " " + theme.global.edgeSize.small + ";\n    ";
    }
  },
  formField: {
    content: {
      pad: undefined
    },
    border: {
      error: {
        color: 'border-strong'
      },
      color: 'border',
      side: 'all'
    },
    disabled: {
      background: {
        color: undefined
      },
      border: {
        color: 'border-weak'
      },
      label: {
        color: 'text-weak'
      }
    },
    error: {
      background: {
        color: {
          light: '#FC61613D',
          dark: '#C54E4B5C'
        }
      },
      size: 'xsmall',
      color: 'text',
      margin: {
        start: 'none'
      }
    },
    focus: {
      border: {
        color: 'border-strong'
      }
    },
    help: {
      size: 'xsmall',
      color: 'text',
      margin: {
        start: 'none',
        bottom: 'xsmall'
      }
    },
    info: {
      size: 'xsmall',
      color: 'text',
      margin: {
        start: 'none'
      }
    },
    label: {
      size: 'xsmall',
      color: 'text',
      margin: {
        horizontal: 'none'
      },
      weight: 500
    },
    round: '4px'
  },
  heading: {
    level: {
      '1': {
        small: {
          size: '36px',
          height: '42px',
          maxWidth: '854px'
        },
        medium: {
          size: '53px',
          height: '59px',
          maxWidth: '1277px'
        },
        large: {
          size: '88px',
          height: '94px',
          maxWidth: '2122px'
        },
        xlarge: {
          size: '124px',
          height: '130px',
          maxWidth: '2966px'
        }
      },
      '2': {
        small: {
          size: '31px',
          height: '37px',
          maxWidth: '749px'
        },
        medium: {
          size: '44px',
          height: '50px',
          maxWidth: '1066px'
        },
        large: {
          size: '58px',
          height: '64px',
          maxWidth: '1382px'
        },
        xlarge: {
          size: '71px',
          height: '77px',
          maxWidth: '1699px'
        }
      },
      '3': {
        small: {
          size: '27px',
          height: '33px',
          maxWidth: '643px'
        },
        medium: {
          size: '36px',
          height: '42px',
          maxWidth: '854px'
        },
        large: {
          size: '44px',
          height: '50px',
          maxWidth: '1066px'
        },
        xlarge: {
          size: '53px',
          height: '59px',
          maxWidth: '1277px'
        }
      },
      '4': {
        small: {
          size: '22px',
          height: '28px',
          maxWidth: '538px'
        },
        medium: {
          size: '27px',
          height: '33px',
          maxWidth: '643px'
        },
        large: {
          size: '31px',
          height: '37px',
          maxWidth: '749px'
        },
        xlarge: {
          size: '36px',
          height: '42px',
          maxWidth: '854px'
        }
      },
      '5': {
        small: {
          size: '16px',
          height: '22px',
          maxWidth: '379px'
        },
        medium: {
          size: '16px',
          height: '22px',
          maxWidth: '379px'
        },
        large: {
          size: '16px',
          height: '22px',
          maxWidth: '379px'
        },
        xlarge: {
          size: '16px',
          height: '22px',
          maxWidth: '379px'
        }
      },
      '6': {
        small: {
          size: '14px',
          height: '20px',
          maxWidth: '326px'
        },
        medium: {
          size: '14px',
          height: '20px',
          maxWidth: '326px'
        },
        large: {
          size: '14px',
          height: '20px',
          maxWidth: '326px'
        },
        xlarge: {
          size: '14px',
          height: '20px',
          maxWidth: '326px'
        }
      }
    },
    weight: 700
  },
  icon: {
    size: {
      xxlarge: '166px'
    }
  },
  layer: {
    background: 'background',
    overlay: {
      background: '#00000080'
    }
  },
  menu: {
    icons: {
      color: 'text-strong'
    }
  },
  paragraph: {
    small: {
      size: '16px',
      height: '22px',
      maxWidth: '379px'
    },
    medium: {
      size: '18px',
      height: '24px',
      maxWidth: '432px'
    },
    large: {
      size: '22px',
      height: '28px',
      maxWidth: '538px'
    },
    xlarge: {
      size: '27px',
      height: '33px',
      maxWidth: '643px'
    },
    xxlarge: {
      size: '36px',
      height: '42px',
      maxWidth: '854px'
    }
  },
  radioButton: {
    color: 'text-strong',
    check: {
      color: 'text-strong'
    },
    gap: 'medium'
  },
  rangeInput: {
    track: {
      color: 'background-contrast'
    },
    thumb: {
      color: 'text'
    }
  },
  select: {
    control: {
      extend: 'padding: 0px;'
    },
    icons: {
      color: 'text',
      down: FormDown,
      up: FormUp
    },
    options: undefined
  },
  tab: {
    color: 'text-strong',
    active: {
      background: 'background-contrast'
    },
    hover: {
      background: 'background-contrast',
      color: 'text'
    },
    border: {
      side: 'bottom',
      color: 'border',
      active: {
        color: 'border-strong'
      },
      hover: {
        color: 'border'
      }
    },
    pad: 'small',
    margin: 'none',
    extend: function extend(_ref6) {
      var theme = _ref6.theme;
      return css(["border-top-left-radius:", ";border-top-right-radius:", ";font-weight:bold;"], theme.global.control.border.radius, theme.global.control.border.radius);
    }
  },
  text: {
    xsmall: {
      size: '14px',
      height: '20px',
      maxWidth: '326px'
    },
    small: {
      size: '16px',
      height: '22px',
      maxWidth: '379px'
    },
    medium: {
      size: '18px',
      height: '24px',
      maxWidth: '432px'
    },
    large: {
      size: '22px',
      height: '28px',
      maxWidth: '538px'
    },
    xlarge: {
      size: '27px',
      height: '33px',
      maxWidth: '643px'
    },
    xxlarge: {
      size: '36px',
      height: '42px',
      maxWidth: '854px'
    }
  },
  // Theme-Designer only parameters
  name: 'HPE 1',
  rounding: 4,
  scale: 1.1,
  spacing: 24
});
var colors = hpe.global.colors;
export { colors };