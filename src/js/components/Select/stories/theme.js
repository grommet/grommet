import { css } from 'styled-components';
import { rgba } from 'polished';

import { FormCheckmark } from 'grommet-icons';

import { normalizeColor } from '../../../utils';

import { ArrowDown } from './components/icons/ArrowDown';
import { SearchInput } from './components/SearchInput';

export const theme = {
  global: {
    colors: {
      border: '#e0e0e0',
      focus: '#2196F3',
      gray: rgba(0, 0, 0, 0.54),
    },
    drop: {
      background: '#ffffff',
    },
    elevation: {
      light: {
        small: '0 2px 2px 0 rgba(0,0,0,0.19)',
        medium: '0 3px 3px 0 rgba(0,0,0,0.18)',
        large: '0 4px 4px 0 rgba(0,0,0,0.17)',
        xlarge: '0 24px 24px 0 rgba(0, 0, 0, 0.12)',
      },
    },
    font: {
      family: 'Arial',
    },
    size: {
      xxsmall: '24px',
    },
  },
  checkBox: {
    border: {
      color: {
        light: css`${props => normalizeColor('gray', props.theme)}`,
      },
      radius: '2px',
    },
    hover: {
      border: {
        color: undefined,
      },
    },
    icons: {
      checked: FormCheckmark,
    },
    size: '18px',
    extend: props => `
      input:checked + div {
        border-color: ${normalizeColor('brand', props.theme)};
        background: ${normalizeColor('brand', props.theme)};

        > svg {
          stroke: ${normalizeColor('white', props.theme)};
        }
      }
    `,
  },
  drop: {
    maxHeight: '384px',
  },
  select: {
    icons: {
      down: ArrowDown,
    },
    searchInput: SearchInput,
  },
  textInput: {
    extend: props => `
      color: ${normalizeColor('gray', props.theme)};
      font-weight: 400;
      font-size: 13px;
      padding: 14px;
    `,
  },
};
