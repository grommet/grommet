import { cloneElement } from 'react';

export const useSizedIcon = (iconArg, size, theme) => {
  let icon = iconArg;

  if (icon && theme?.icon?.matchSize && !icon.props.size) {
    icon = cloneElement(icon, {
      size,
    });
  }

  return icon;
};
