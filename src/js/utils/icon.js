import { cloneElement } from 'react';

export const useSizedIcon = (icon, size, theme) =>
  icon && theme?.icon?.matchSize && !icon.props.size
    ? cloneElement(icon, { size })
    : icon;
