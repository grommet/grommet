import { rgba } from 'polished';
import { FormCheckmark } from "grommet-icons/es6/icons/FormCheckmark";
import { normalizeColor } from '../../../utils';
import { ArrowDown } from './components/icons/ArrowDown';
import { SearchInput } from './components/SearchInput';
export var theme = {
  global: {
    colors: {
      border: '#e0e0e0',
      focus: '#2196F3',
      gray: rgba(0, 0, 0, 0.54)
    },
    drop: {
      background: '#ffffff'
    },
    elevation: {
      light: {
        small: '0 2px 2px 0 rgba(0,0,0,0.19)',
        medium: '0 3px 3px 0 rgba(0,0,0,0.18)',
        large: '0 4px 4px 0 rgba(0,0,0,0.17)',
        xlarge: '0 24px 24px 0 rgba(0, 0, 0, 0.12)'
      }
    },
    font: {
      family: 'Arial'
    },
    size: {
      xxsmall: '24px'
    }
  },
  checkBox: {
    border: {
      color: {
        light: 'brand'
      },
      radius: '2px'
    },
    color: {
      light: 'brand'
    },
    check: {
      extend: function extend(_ref) {
        var extendTheme = _ref.theme,
            checked = _ref.checked;
        return "\n        " + (checked && "background-color: " + normalizeColor('brand', extendTheme) + ";") + "\n      ";
      }
    },
    hover: {
      border: {
        color: undefined
      }
    },
    icon: {
      size: '18px',
      extend: 'stroke: white;'
    },
    icons: {
      checked: FormCheckmark
    },
    gap: 'small',
    size: '18px',
    extend: "\n      color: #9C9C9C;\n    "
  },
  drop: {
    maxHeight: '384px'
  },
  select: {
    icons: {
      down: ArrowDown
    },
    searchInput: SearchInput,
    container: {
      text: {
        size: 'small'
      },
      extend: 'max-height: 250px;'
    }
  },
  textInput: {
    extend: function extend(props) {
      return "\n      color: " + normalizeColor('gray', props.theme) + ";\n      font-weight: 400;\n      font-size: 13px;\n      padding: 14px;\n    ";
    }
  }
};