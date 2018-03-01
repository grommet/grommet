import * as React from 'react';
import Grommet from '../index';

export declare namespace ButtonTypes {
  type HoverIndicator = 'background' | { background: boolean | string; };
  type Type = 'button' | 'reset' | 'submit';
}

export interface ButtonProps extends Grommet.Props {
  a11yTitle?: string;
  accent?: boolean;
  box?: boolean;
  centered?: boolean;
  critical?: boolean;
  fill?: boolean;
  hoverIndicator?: ButtonTypes.HoverIndicator;
  href?: string;
  icon?: React.ReactElement<any>;
  label?: React.ReactNode;
  plain?: boolean;
  primary?: boolean;
  reverse?: boolean;
  secondary?: boolean;
  type?: ButtonTypes.Type;
}

export class Button extends React.Component<ButtonProps, undefined> { }

export default Button;
