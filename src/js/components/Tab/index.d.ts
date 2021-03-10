import * as React from 'react';
import { Omit } from '../../utils';

export interface TabProps {
  disabled?: boolean;
  icon?: JSX.Element;
  plain?: boolean;
  reverse?: boolean;
  title?: React.ReactNode;
}

export interface TabExtendedProps
  extends TabProps,
    Omit<JSX.IntrinsicElements['button'], 'title'> {}

declare const Tab: React.FC<TabExtendedProps>;

export { Tab };
