import * as React from 'react';
import { ButtonProps } from '../Button';
import { DropProps } from '../Drop';
import { Omit } from '../../utils';

export interface DropButtonProps {
  dropAlign?: {
    top?: 'top' | 'bottom';
    bottom?: 'top' | 'bottom';
    right?: 'left' | 'right';
    left?: 'left' | 'right';
  };
  dropContent: JSX.Element;
  dropTarget?: object;
  dropProps?: DropProps;
  onClose?: React.MouseEventHandler<HTMLDocument | HTMLButtonElement>;
  onOpen?: React.MouseEventHandler<HTMLButtonElement>;
  open?: boolean;
}

type buttonProps = ButtonProps & Omit<JSX.IntrinsicElements['button'], 'color'>;

export interface DropButtonExtendedProps extends DropButtonProps, buttonProps {}

declare const DropButton: React.FC<DropButtonExtendedProps>;

export { DropButton };
