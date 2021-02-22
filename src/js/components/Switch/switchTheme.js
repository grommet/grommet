import { normalizeColor } from "../../utils";

const getColor = (type, checked, disabled, theme) => {
  const {
    switch: {
      [type]: {
        active: activeColor,
        inactive: inactiveColor,
        disabled: {
          active: disabledActiveColor = activeColor,
          inactive: disabledInactiveColor = inactiveColor,
        },
      },
    },
  } = theme;
  if (disabled && checked) {
    return disabledActiveColor;
  }
  if (disabled && !checked) {
    return disabledInactiveColor;
  }
  if (!disabled && checked) {
    return activeColor;
  }
  return inactiveColor;
};

const getSwitchTheme = () => ({
  radioButton: {
    extend: ({ checked, disabled, theme }) => ({
      backgroundColor: normalizeColor(
        getColor('background', checked, disabled, theme), theme,
      ),
      color: normalizeColor(
        getColor('text', checked, disabled, theme), theme,
      ),
      '&>div': {
        display: 'none',
      },
      ...theme.switch,
    }),
  },
});

export default getSwitchTheme;
