import React, { useState } from 'react';

import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const BLACK = '#000000';
const WHITE = '#ffffff';
const BRAND = '#3c50dd';

// Color names from: http://chir.ag/projects/name-that-color/
// Temporary until we have our own design system in place with color names.
const SILVER = '#c4c4c4';
const SILVER_CHALICE = '#acacac';
const ALTO = '#dadada';
const BOULDER = '#757575';
const FOCUS = '#3cddca';

const customToggleTheme = {
  global: {
    colors: {
      background: { light: WHITE, dark: BLACK },
      active: { light: BLACK, dark: WHITE },
      black: { light: BLACK, dark: WHITE },
      brand: { light: BRAND, dark: WHITE },
      brandTransparent: 'brand',
      brandSecondary: 'brand',
      brandTertiary: 'brand',
      brandText: { light: '#192550', dark: WHITE },
      brandHover: { light: '#2451bd', dark: '#eeeeee' },
      placeholder: { light: '#cacaca', dark: '#888888' },
      text: { light: BLACK, dark: WHITE },
      icon: { light: BLACK, dark: WHITE },
      white: { light: WHITE, dark: BLACK },
      lightGray: { light: '#343A40', dark: '#FFFFFF' },
      gray: { light: '#343A40', dark: '#FFFFFF' },
      darkGray: { light: '#343A40', dark: '#FFFFFF' },
      focus: { light: FOCUS, dark: WHITE },
      border: { light: '#cacaca', dark: '#353535' },
      borderHover: { light: '#cacaca55', dark: '#35353555' },
      'accent-1': '#6FFFB0',
      'accent-2': '#FD6FFF',
      'accent-3': '#81FCED',
      'accent-4': '#FFCA58',
      'neutral-1': '#00873D',
      'neutral-2': '#3D138D',
      'neutral-3': '#00739D',
      'neutral-4': '#A2423D',
      control: { light: 'brand', dark: '#6FFFB0' },
      selected: { light: 'brand', dark: 'purple' },
      'status-critical': '#FF4040',
      'status-error': '#FF4040',
      'status-warning': '#FFAA15',
      'status-ok': '#00C781',
      'status-unknown': '#CCCCCC',
      'status-disabled': '#CCCCCC',
      'input-border': { light: '#cacaca', dark: '#353535' },
      'button-border': { light: '#cacaca88', dark: '#35353588' },
      'button-hover': { light: '#efefef', dark: '#121212' },
      'light-1': { light: '#f8f8fa', dark: '#080804' },
      'light-2': { light: '#f1f1f6', dark: '#0e0e09' },
      'light-3': { light: '#ededed', dark: '#121212' },
      'light-4': { light: '#dadada', dark: '#252525' },
      'light-5': { light: '#c0c0c0', dark: '#3f3f3f' },
      'light-6': { light: '#aaaaaa', dark: '#555555' },
      'dark-1': { light: '#111111', dark: '#eeeeee' },
      'dark-2': { light: '#333333', dark: '#cccccc' },
      'dark-3': { light: '#444444', dark: '#bbbbbb' },
      'dark-4': { light: '#777777', dark: '#888888' },
      'dark-5': { light: '#999999', dark: '#666666' },
      'dark-6': { light: '#bbbbbb', dark: '#444444' },
      sidebarNode: SILVER,
      workflowNode: SILVER_CHALICE,
      tabsBorder: ALTO,
      inactive: BOULDER,
      // kind of a style hack to make the default button have the right
      // background color in the complex "add item" dropdown menu, which
      // has a brand background
      defaultButtonBackground: { light: WHITE, dark: BRAND },
    },
  },
  checkBox: {
    toggle: {
      container: {
        background: 'inactive',
        size: '40px',
        height: '24px',
        checked: {
          background: 'brand',
        },
        pad: '4px',
        border: {
          width: '0px',
        },
      },
      knob: {
        size: '16px',
        color: 'white',
        checked: {
          color: 'white',
        },
      },
    },
  },
};

export const BlendToggle = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <Grommet theme={deepMerge(grommet, customToggleTheme)}>
      <Box align="center" pad="large">
        <CheckBox
          {...props}
          label="Choice"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          toggle
        />
      </Box>
    </Grommet>
  );
};

BlendToggle.storyName = 'Blend toggle (temp)';

export default {
  title: 'Input/CheckBox/Blend toggle',
};
