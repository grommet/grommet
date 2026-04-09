import {
  AnimateType,
  BackgroundType,
  KeyboardType,
  MarginType,
} from 'grommet/utils';
import * as React from 'react';
import { LayerPositionType } from '.';

interface LayerContainerProps {
  animate?: AnimateType;
  animation?: 'none' | 'slide' | 'fadeIn' | boolean;
  background?: BackgroundType;
  children?: React.ReactNode;
  full?: boolean | 'vertical' | 'horizontal';
  id?: string;
  margin?: MarginType;
  modal?: boolean;
  onClickOutside?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  onEsc?: KeyboardType;
  plain?: boolean;
  position?: LayerPositionType;
  responsive?: boolean;
  target?: object;
}

type divProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

interface LayerContainerExtendedProps extends LayerContainerProps, divProps {}

declare const LayerContainer: React.ForwardRefExoticComponent<
  LayerContainerExtendedProps & React.RefAttributes<HTMLDivElement>
>;

export { LayerContainer };
